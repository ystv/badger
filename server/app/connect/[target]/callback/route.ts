import { checkSession } from "@/lib/auth";
import { saveTokens } from "@/lib/connections";
import invariant from "@/lib/invariant";
import { ConnectionTargetSchema } from "@bowser/prisma/types";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { target: string } },
) {
  const user = await checkSession();
  invariant(user, "No user");

  const target = ConnectionTargetSchema.safeParse(params.target);
  invariant(target.success, "Invalid target");
  invariant(target.data === "google", "unexpected target");

  const url = req.nextUrl;
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.PUBLIC_URL! + "/connect/google/callback",
  });
  const tokenRes = await client.getToken(url.searchParams.get("code")!);
  invariant(
    tokenRes.res?.status === 200,
    "Failed to get token: " + tokenRes.res?.statusText,
  );
  invariant(tokenRes.tokens.access_token, "No access token");

  await saveTokens(
    "google",
    user.id,
    tokenRes.tokens.access_token,
    tokenRes.tokens.refresh_token,
  );

  const returnUrl = new URL("/", process.env.PUBLIC_URL!);
  return NextResponse.redirect(returnUrl.toString(), {
    status: 303,
  });
}
