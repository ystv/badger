import invariant from "@/lib/invariant";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  invariant(
    process.env.E2E_TEST === "true",
    "cannot call outside of E2E tests",
  );
  console.log("Resetting database");
  // Don't be tempted to Promise.all this - it'll deadlock!
  for (const table of [
    "shows",
    "rundowns",
    "rundown_items",
    "continuity_items",
    "assets",
    "media",
    "users",
    "metadata",
    "base_jobs",
  ]) {
    await db.$executeRawUnsafe(`DELETE FROM "${table}";`);
  }
  return new NextResponse("ok");
}
