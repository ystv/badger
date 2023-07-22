import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const DEBUG_MODE_COOKIE = "debugMode";

export function GET(req: NextRequest): NextResponse {
  const val = req.nextUrl.searchParams.get("value")
    ? req.nextUrl.searchParams.get("value") === "true"
    : true;
  cookies().set(DEBUG_MODE_COOKIE, String(val), {});
  return NextResponse.redirect(new URL("/", req.url));
}
