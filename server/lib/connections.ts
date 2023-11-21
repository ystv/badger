import { ConnectionTarget } from "@bowser/prisma/client";
import { db } from "./db";
import { cookies } from "next/headers";
import { OAuth2Client } from "google-auth-library";
import { expectNever } from "ts-expect";

export function makeGoogleOauthClient() {
  return new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.PUBLIC_URL!}/connect/google/callback`,
  });
}

function connCookieName(target: ConnectionTarget) {
  return `${target}_access_token`;
}

function getConnCookie(target: ConnectionTarget) {
  return cookies().get(connCookieName(target));
}

function setConnCookie(target: ConnectionTarget, value: string) {
  return cookies().set(connCookieName(target), value, {
    sameSite: "strict",
    expires: new Date(Date.now() + 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

export async function getConnectionAccessToken(
  target: ConnectionTarget,
  userID: number,
) {
  const cookie = getConnCookie(target);
  if (cookie) {
    return cookie.value;
  }

  const conn = await db.connection.findUnique({
    where: {
      userId_target: {
        target,
        userId: userID,
      },
    },
  });
  if (!conn) {
    return null;
  }

  switch (target) {
    case ConnectionTarget.google: {
      const client = makeGoogleOauthClient();
      client.setCredentials({
        refresh_token: conn.refreshToken,
      });
      const accessToken = await client.getAccessToken();
      setConnCookie(target, accessToken.token!);
      return accessToken.token;
    }
    default:
      expectNever(target);
  }
}

export async function saveTokens(
  target: ConnectionTarget,
  userID: number,
  accessToken: string,
  refreshToken?: string | null,
) {
  setConnCookie(target, accessToken);
  if (refreshToken) {
    await db.connection.upsert({
      where: {
        userId_target: {
          userId: userID,
          target,
        },
      },
      update: {
        refreshToken: refreshToken,
      },
      create: {
        target,
        userId: userID,
        refreshToken: refreshToken,
      },
    });
  }
}
