import { makeJWT, parseAndVerifyJWT } from "@/lib/auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Permission } from "@badger/prisma/client";
import { db } from "../db";
import { User, UserSchema } from "@badger/prisma/types";
import {
  autoActivateAllUsers,
  disablePermissionsChecks,
  enableUserManagement,
} from "@badger/feature-flags";
import { BasicUserInfo } from "./types";
import { Forbidden, Unauthorized } from "./errors";

// HACK: middleware runs in the edge runtime and for some reason fails the server-only check
if (process.env.NEXT_RUNTIME !== "edge") {
  // @ts-expect-error idk lol
  import("server-only");
}

export enum SignInResult {
  Success = "success",
  CreatedInactive = "created_inactive",
  Inactive = "inactive",
}

const cookieName = "badger_session";

export async function doSignIn(
  provider: string,
  credentials: BasicUserInfo,
): Promise<SignInResult> {
  let user: User;
  if (enableUserManagement) {
    const autoActivateDomains = new Set(
      process.env.USER_AUTO_CREATE_DOMAINS?.split(", "),
    );
    const shouldAutoActivate =
      autoActivateAllUsers ||
      autoActivateDomains.has(credentials.domain ?? "NEVER");
    let didExist;
    [user, didExist] = await db.$transaction(async ($db) => {
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
        return [user, true] as const;
      }
      return [
        await $db.user.create({
          data: {
            name: credentials.name,
            email: credentials.email ?? null,
            permissions: shouldAutoActivate ? [Permission.Basic] : [],
            isActive: shouldAutoActivate,
            identities: {
              create: {
                provider,
                identityID: credentials.id,
              },
            },
          },
        }),
        false,
      ] as const;
    });
    if (!didExist && !shouldAutoActivate) {
      return SignInResult.CreatedInactive;
    }
    if (!user.isActive) {
      return SignInResult.Inactive;
    }
  } else {
    user = {
      id: parseInt(credentials.id, 10),
      email: credentials.email ?? null,
      isActive: true,
      name: credentials.name,
      permissions: [Permission.Basic],
    };
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

export async function deleteSession() {
  const { cookies } = await import("next/headers");
  cookies().delete(cookieName);
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

export async function hasPermission(perm: Permission, req?: NextRequest) {
  const user = await checkSession(req);
  if (!user) return false;
  if (disablePermissionsChecks) return true;
  if (user.permissions.includes(perm)) return true;
  if (user.permissions.includes(Permission.SUDO)) return true;
  return false;
}

export async function requirePermission(perm: Permission, req?: NextRequest) {
  const user = await checkSession(req);
  if (!user) throw new Unauthorized();
  if (disablePermissionsChecks) return user;
  if (user.permissions.includes(perm)) return user;
  if (user.permissions.includes(Permission.SUDO)) return user;
  throw new Forbidden(perm);
}
