import invariant from "@/lib/invariant";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  invariant(
    process.env.E2E_TEST === "true",
    "cannot call outside of E2E tests",
  );
  console.log("Resetting database");
  await Promise.all(
    [
      "shows",
      "rundowns",
      "rundown_items",
      "continuity_items",
      "assets",
      "media",
      "users",
      "metadata",
      "base_jobs",
    ].map((table) =>
      db.$queryRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`),
    ),
  );
  return new NextResponse("ok");
}
