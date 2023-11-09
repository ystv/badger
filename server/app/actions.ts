"use server";

import { checkSession, deleteSession } from "@/lib/auth";
import { db } from "@/lib/db";
import invariant from "@/lib/invariant";
import { redirect } from "next/navigation";

export async function DEV_promoteSelf() {
  invariant(process.env.NODE_ENV === "development", "Dev-only [1]");
  invariant(process.env.ENVIRONMENT !== "prod", "Dev-only [2]");
  const me = await checkSession();
  invariant(me, "No user");
  await db.user.update({
    where: {
      id: me.id,
    },
    data: {
      permissions: [...me.permissions, "SUDO"],
    },
  });
  await deleteSession();
  redirect("/");
}
