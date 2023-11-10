import invariant from "@/lib/invariant";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { PermissionSchema } from "@bowser/prisma/types";

export async function POST(req: NextRequest) {
  invariant(
    process.env.E2E_TEST === "true",
    "cannot call outside of E2E tests",
  );
  const data = await req.json();
  const perm = PermissionSchema.safeParse(data.permission);
  invariant(perm.success, "invalid permission");
  const r = await db.user.updateMany({
    where: {
      email: data.email,
    },
    data: {
      permissions: {
        push: perm.data,
      },
    },
  });
  invariant(r.count > 0, "no user found");
  return new NextResponse("ok");
}
