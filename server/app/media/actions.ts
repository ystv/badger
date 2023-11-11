"use server";

import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { bulkDelete } from "@/lib/s3";
import { MediaState, Permission } from "@bowser/prisma/client";
import { revalidatePath } from "next/cache";

export async function archiveMedia(ids: number[]) {
  await requirePermission(Permission.ArchiveMedia);
  const mediaPaths = await db.$transaction(async ($db) => {
    const media = await $db.media.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        path: true,
      },
    });
    await $db.media.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        state: MediaState.Archived,
        path: null,
      },
    });
    return media.map((m) => m.path);
  });
  await bulkDelete(mediaPaths.filter(Boolean) as string[]);
  revalidatePath("/media");
  revalidatePath("/shows/[show_id]", "layout");
  revalidatePath("/shows/[show_id]/rundown/[rundown_id]", "layout");
  return { ok: true };
}

export async function deletMedia(ids: number[]) {
  await requirePermission(Permission.ArchiveMedia);
  const mediaPaths = await db.$transaction(async ($db) => {
    const media = await $db.media.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        path: true,
        rawPath: true,
      },
    });
    await $db.media.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return media
      .flatMap((m) => [m.path, m.rawPath])
      .filter(Boolean) as string[];
  });
  await bulkDelete(mediaPaths);
  revalidatePath("/media");
  revalidatePath("/shows/[show_id]", "layout");
  revalidatePath("/shows/[show_id]/rundown/[rundown_id]", "layout");
  return { ok: true };
}
