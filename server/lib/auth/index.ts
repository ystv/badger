import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Permission } from "@bowser/prisma/client";
import { db } from "../db";
import { UserSchema } from "@bowser/prisma/types";
import { enableUserManagement } from "@bowser/feature-flags";
import { BasicUserInfo } from "./types";

// HACK: middleware runs in the edge runtime and for some reason fails the server-only check
if (process.env.NEXT_RUNTIME !== "edge") {
  // @ts-expect-error idk lol
  import("server-only");
}

export enum SignInResult {
  Success = "success",
  CreatedInactive = "created_inactive",
}

const cookieName = "bowser_session";

export async function doSignIn(
  provider: string,
  credentials: BasicUserInfo,
): Promise<SignInResult> {
  let user;
  if (enableUserManagement) {
    user = await db.$transaction(async ($db) => {
      const user = await $db.user.findFirst({
        where: {
          identities: {
            some: {
              provider,
              identityID: credentials.id,
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
          name: credentials.name,
          permissions: [Permission.Basic],
          isActive: true,
          identities: {
            create: {
              provider,
              identityID: credentials.id,
            },
          },
        },
      });
    });
  } else {
    user = credentials;
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

  return SignInResult.Success;
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
