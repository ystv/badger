import { z } from "zod";
import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

// HACK: middleware runs in the edge runtime and for some reason fails the server-only check
if (process.env.NEXT_RUNTIME !== "edge") {
  // @ts-expect-error idk lol
  import("server-only");
}

export const UserSchema = z.object({
  id: z.coerce.string(),
  first_name: z.string(),
  last_name: z.string(),
  server_name: z.string(),
  its_name: z.string(),
  email: z.string().email(),
  groups: z.array(z.string()),
});
export type User = z.infer<typeof UserSchema>;

export class IncorrectUsernameOrPassword extends Error {}

export async function checkCredentials(
  username: string,
  password: string,
): Promise<User> {
  const url = `https://sso.ystv.co.uk/REST.php?api-version=latest&api-name=usermanagement&resource-name=checkcredentials`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        process.env.YSTV_SSO_USERNAME + ":" + process.env.YSTV_SSO_PASSWORD,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  if (res.status === 401) {
    console.log(await res.text());
    throw new IncorrectUsernameOrPassword();
  }
  if (res.status !== 200) {
    console.warn("Unexpected response from SSO", await res.text());
    throw new Error("Unexpected response from SSO");
  }
  const data = await res.json();
  return UserSchema.parse(data);
}

const cookieName = "bowser_session";

export async function doSignIn(username: string, password: string) {
  const user = await checkCredentials(username, password);
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
  return new URL(baseUrl, process.env.PUBLIC_URL).toString();
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
