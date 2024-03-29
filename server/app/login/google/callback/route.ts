import { SignInResult, doSignIn } from "@/lib/auth";
import { verifyToken } from "@/lib/auth/google";
import { enableGoogleLogin } from "@badger/feature-flags";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { expectNever } from "ts-expect";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!enableGoogleLogin) {
    notFound();
  }

  const dataRaw = await req.formData();
  const idToken = dataRaw.get("credential");
  if (typeof idToken !== "string" || idToken === null) {
    return new NextResponse(
      "Something went wrong - please try again. (No credential in Google response.)",
      {
        status: 400,
      },
    );
  }

  const creds = await verifyToken(idToken);

  const res = await doSignIn("google", creds);
  switch (res) {
    case SignInResult.Success: {
      const retURL = cookies().get("badger_auth_return")?.value;
      if (retURL && typeof retURL === "string") {
        if (retURL.startsWith("/")) {
          const url = new URL(retURL, process.env.PUBLIC_URL);
          return NextResponse.redirect(url.toString(), {
            status: 303,
          });
        }
        return NextResponse.redirect(retURL, {
          status: 303,
        });
      }
      return NextResponse.redirect(process.env.PUBLIC_URL!, {
        status: 303,
      });
    }
    case SignInResult.CreatedInactive:
    case SignInResult.Inactive:
      return NextResponse.redirect(
        new URL(`/login?status=${res}`, process.env.PUBLIC_URL).toString(),
        {
          status: 303,
        },
      );
    default:
      expectNever(res);
  }
}
