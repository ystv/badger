import { checkSession } from "@/lib/auth";
import {
  getConnectionAccessToken,
  makeGoogleOauthClient,
} from "@/lib/connections";
import invariant from "@/lib/invariant";
import { ConnectionTargetSchema } from "@badger/prisma/types";
import { NextRequest, NextResponse } from "next/server";
import { expectNever } from "ts-expect";

export async function GET(
  req: NextRequest,
  { params }: { params: { target: string } },
) {
  const user = await checkSession();
  invariant(user, "No user");

  const target = ConnectionTargetSchema.safeParse(params.target);
  invariant(target.success, "Invalid target");
  invariant(target.data === "google", "unexpected target");

  // No point in refreshing if we already have a refresh token
  const token = await getConnectionAccessToken(target.data, user.id);
  if (token) {
    return NextResponse.redirect("/", {
      status: 303,
    });
  }

  switch (target.data) {
    case "google": {
      const client = makeGoogleOauthClient();
      const url = client.generateAuthUrl({
        scope: ["https://www.googleapis.com/auth/youtube"],
        login_hint: user.email ?? undefined,
        access_type: "offline",
        include_granted_scopes: true,
        prompt: "select_account",
      });
      return NextResponse.redirect(url, {
        status: 303,
      });
    }
    default:
      expectNever(target.data);
  }
}
