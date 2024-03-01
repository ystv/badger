"use server";

import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { dispatchJobForJobrunner } from "@/lib/jobs";
import { revalidatePath } from "next/cache";

export async function doResetJob(baseJobID: number) {
  await requirePermission("ManageJobs");
  await db.baseJob.update({
    where: {
      id: baseJobID,
    },
    data: {
      startedAt: null,
      completedAt: null,
      workerId: null,
      externalJobProvider: null,
      externalJobID: null,
      state: "Pending",
    },
  });
  await dispatchJobForJobrunner(baseJobID);
  revalidatePath("/jobs");
  return { ok: true };
}
