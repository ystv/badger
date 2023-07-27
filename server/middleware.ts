import { NextRequest, NextResponse } from "next/server";
import { checkSession, makePublicURL } from "@/lib/auth";

export const middleware = async (req: NextRequest) => {
  const user = await checkSession(req);
  if (!user) {
    return NextResponse.redirect(
      makePublicURL("/login?return=" + makePublicURL(req?.nextUrl ?? "/")),
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
