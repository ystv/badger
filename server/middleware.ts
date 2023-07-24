import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const middleware = auth((req) => {
  if (!req.auth.user) {
    const url = req.nextUrl.clone();
    // Handle running in Docker
    if (process.env.PUBLIC_URL) {
      const publicUrl = new URL(process.env.PUBLIC_URL);
      url.host = publicUrl.host;
    }
    url.searchParams.set("callbackUrl", url.href);
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};
