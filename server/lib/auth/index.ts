import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { User, UserSchema } from "@/lib/auth/types";
import invariant from "@/lib/invariant";
import { DummyTestAuth } from "@/lib/auth/dummyTest";
import { YSTVAuth } from "@/lib/auth/ystv";

// HACK: middleware runs in the edge runtime and for some reason fails the server-only check
if (process.env.NEXT_RUNTIME !== "edge") {
  // @ts-expect-error idk lol
  import("server-only");
}

function determineProvider() {
  if (process.env.USE_DUMMY_TEST_AUTH === "true") {
    // Don't be tempted to put a NODE_ENV test here - even when built with NODE_ENV=test, Next sets
    // process.env.NODE_ENV to "production".
    // See https://github.com/vercel/next.js/issues/17032#issuecomment-691491353
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
  let user;
  try {
    user = await parseAndVerifyJWT(sid, {
      iss: process.env.PUBLIC_URL!,
    });
  } catch (e) {
    console.warn("Failed to parse JWT", e);
    return null;
  }
  return UserSchema.parse(user);
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
