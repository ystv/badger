import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import invariant from "@/lib/invariant";
import { DummyTestAuth } from "@/lib/auth/dummyTest";
import { YSTVAuth } from "@/lib/auth/ystv";
import * as Sentry from "@sentry/nextjs";
import { Permission } from "@bowser/prisma/client";
import { db } from "../db";
import { UserSchema } from "@bowser/prisma/types";
import { enableUserManagement } from "@bowser/feature-flags";

// HACK: middleware runs in the edge runtime and for some reason fails the server-only check
if (process.env.NEXT_RUNTIME !== "edge") {
  // @ts-expect-error idk lol
  import("server-only");
}

function determineProvider() {
  if (process.env.USE_DUMMY_TEST_AUTH === "true") {
    invariant(
      process.env.NODE_ENV !== "production" || process.env.E2E_TEST === "true",
      "Cannot enable dummy test auth in production",
    );
    console.warn("Using dummy test auth - do *not* use this in production!");
    return DummyTestAuth;
  }
  if (process.env.YSTV_SSO_USERNAME && process.env.YSTV_SSO_PASSWORD) {
    return YSTVAuth;
  }
  invariant(
    false,
    "No authentication configured. Set USE_DUMMY_TEST_AUTH=true or set YSTV_SSO_USERNAME and YSTV_SSO_PASSWORD",
  );
}

const provider = determineProvider();

const cookieName = "bowser_session";

export async function doSignIn(username: string, password: string) {
  const providerUserInfo = await provider.checkCredentials(username, password);

  let user;
  if (enableUserManagement) {
    user = await db.$transaction(async ($db) => {
      const user = await $db.user.findFirst({
        where: {
          identities: {
            some: {
              provider: provider.id,
              identityID: providerUserInfo.id,
            },
          },
        },
      });
      if (user) {
        return user;
      }
      // TODO[BOW-108]: not auto-create
      return await $db.user.create({
        data: {
          name: providerUserInfo.name,
          permissions: [Permission.Basic],
          isActive: true,
          identities: {
            create: {
              provider: provider.id,
              identityID: providerUserInfo.id,
            },
          },
        },
      });
    });
  } else {
    user = providerUserInfo;
  }

  const claims = user as Record<string, unknown>;
  claims.v = 2;
  claims.iss = process.env.PUBLIC_URL;
  claims.sub = user.id;
  const iat = Math.floor(Date.now() / 1000);
  claims.iat = iat;
  claims.nbf = iat;
  claims.exp = iat + 60 * 60 * 24 * 7;
  const token = await makeJWT(claims);
  const { cookies } = await import("next/headers");
  cookies().set(cookieName, token, {
    maxAge: 60 * 60 * 24 * 7,
  });
  if (Sentry.getCurrentHub().getClient()) {
    Sentry.setUser({
      id: user.id,
      email: user.email ?? undefined,
    });
  }
}

export function makePublicURL(baseUrl: URL | string) {
  const url = new URL(baseUrl.toString(), process.env.PUBLIC_URL);
  // Just passing the second parameter to `new URL()` isn't sufficient to *override* the host
  if (process.env.PUBLIC_URL) {
    const publicUrl = new URL(process.env.PUBLIC_URL);
    url.protocol = publicUrl.protocol;
    url.host = publicUrl.host;
    url.port = publicUrl.port;
  }
  return url.toString();
}

async function getSessionFromCookie(req?: NextRequest) {
  if (req) {
    const sessionID = req.cookies.get(cookieName);
    if (!sessionID) return null;
    return sessionID.value;
  }
  const { cookies } = await import("next/headers");
  const sessionID = cookies().get(cookieName);
  if (!sessionID) return null;
  return sessionID.value;
}

export async function checkSession(req?: NextRequest) {
  const sid = await getSessionFromCookie(req);
  if (!sid) return null;
  let rawUser;
  try {
    rawUser = await parseAndVerifyJWT(sid, {
      iss: process.env.PUBLIC_URL!,
    });
  } catch (e) {
    console.warn("Failed to parse JWT", e);
    return null;
  }
  if (rawUser.v !== 2) {
    console.warn("Got outdated session JWT, treating as unauthenticated");
    return null;
  }
  const user = UserSchema.parse(rawUser);
  if (Sentry.getCurrentHub().getClient()) {
    Sentry.setUser({
      id: user.id,
      email: user.email ?? undefined,
    });
  }
  if (!user.isActive) {
    // TODO[BOW-108]: This doesn't check it from the database, meaning that if the user is deactivated
    //  while signed in, they can still access the site until their session expires.
    return null;
  }
  return user;
}

export async function auth(req?: NextRequest) {
  const u = await checkSession(req);
  if (!u) {
    redirect(
      makePublicURL("/login?return=" + makePublicURL(req?.nextUrl ?? "/")),
    );
  }
  return u;
}
