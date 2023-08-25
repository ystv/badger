import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { UserSchema } from "@/lib/auth/types";
import invariant from "@/lib/invariant";
import { DummyTestAuth } from "@/lib/auth/dummyTest";
import { YSTVAuth } from "@/lib/auth/ystv";
import * as Sentry from "@sentry/nextjs";

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
  const user = await provider.checkCredentials(username, password);
  const claims = user as Record<string, unknown>;
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
      username: user.server_name ?? user.its_name ?? user.email,
      email: user.email,
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
  const user = UserSchema.parse(rawUser);
  if (Sentry.getCurrentHub().getClient()) {
    Sentry.setUser({
      id: user.id,
      username: user.server_name ?? user.its_name ?? user.email,
      email: user.email,
    });
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
