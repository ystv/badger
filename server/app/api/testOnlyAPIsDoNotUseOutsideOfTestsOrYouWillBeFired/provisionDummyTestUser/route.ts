import invariant from "@/lib/invariant";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { DUMMY_TEST_USER_ID, DummyTestAuth } from "@/lib/auth/dummyTest";

export async function POST() {
  invariant(
    process.env.E2E_TEST === "true",
    "cannot call outside of E2E tests",
  );
  await db.user.create({
    data: {
      name: "Dummy Test User",
      email: "test@example.com",
      permissions: ["SUDO"],
      identities: {
        create: {
          provider: DummyTestAuth.id,
          identityID: DUMMY_TEST_USER_ID,
        },
      },
    },
  });
  return new NextResponse("ok");
}
