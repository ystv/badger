import { OAuth2Client } from "google-auth-library";
import { BasicUserInfo } from "./types";

interface GoogleTokenClaims {
  iss: string;
  azp?: string;
  aud: string;
  sub: string;
  hd?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  iat: number;
  exp: number;
}

const Google = new OAuth2Client();

export async function verifyToken(rawToken: string): Promise<BasicUserInfo> {
  const ticket = await Google.verifyIdToken({
    idToken: rawToken,
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });
  const payload: GoogleTokenClaims = ticket.getPayload()!;
  if (!payload) {
    throw new Error("No payload in token");
  }

  return {
    id: payload.sub,
    name: payload.name ?? "",
    email: payload.email ?? undefined,
    domain: payload.hd,
  };
}
