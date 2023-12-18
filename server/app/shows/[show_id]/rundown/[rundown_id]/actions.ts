"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function revalidateIfChanged(rundownID: number, version: number) {
  const rundown = await db.rundown.findUnique({
    where: { id: rundownID },
    select: {
      show: {
        select: { version: true, id: true },
      },
    },
  });
  if (!rundown) {
    notFound();
  }
  if (rundown.show.version !== version) {
    revalidatePath(`/shows/${rundown.show.id}/rundown/${rundownID}`);
  }
}
