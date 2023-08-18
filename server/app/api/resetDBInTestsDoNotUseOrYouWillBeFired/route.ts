import invariant from "@/lib/invariant";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  invariant(
    process.env.E2E_TEST === "true",
    "cannot call outside of E2E tests",
  );
  console.log("Resetting database");
  await db.$queryRawUnsafe("TRUNCATE TABLE shows CASCADE");
  await db.$queryRawUnsafe("TRUNCATE TABLE media CASCADE");
  await db.$queryRawUnsafe("TRUNCATE TABLE base_jobs CASCADE");
  return new NextResponse("ok");
}
