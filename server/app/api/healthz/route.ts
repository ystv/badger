import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  await db.$queryRaw`SELECT 1+1;`;
  return NextResponse.json({ ok: true });
}
