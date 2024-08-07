"use server";

import { FormResponse } from "@/components/Form";
import { z } from "zod";
import { AddItemSchema, EditItemSchema } from "./schema";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { JobState, MediaState } from "@badger/prisma/client";

import { dispatchJobForJobrunner } from "@/lib/jobs";
import invariant from "@/lib/invariant";
import { getPublicTusEndpoint, uploadUrlToPath } from "@/lib/tus";

export async function addItem(
  raw: z.infer<typeof AddItemSchema>,
): Promise<FormResponse> {
  const data = AddItemSchema.safeParse(raw);
  if (!data.success) {
    return zodErrorResponse(data.error);
  }
  const res = await db.$transaction(async ($db) => {
    const highestOrder = await $db.rundownItem.aggregate({
      _max: { order: true },
      where: { rundownId: data.data.rundownID },
    });
    const newOrder = (highestOrder._max.order ?? -1) + 1;
    const res = await $db.rundownItem.create({
      data: {
        name: data.data.name,
        type: data.data.type,
        durationSeconds: data.data.durationSeconds,
        notes: data.data.notes,
        order: newOrder,
        rundown: {
          connect: { id: data.data.rundownID },
        },
      },
      include: {
        rundown: true,
      },
    });
    await $db.rundown.update({
      where: {
        id: data.data.rundownID,
      },
      data: {
        show: {
          update: {
            version: {
              increment: 1,
            },
          },
        },
      },
    });
    return res;
  });
  revalidatePath(`/shows/${res.rundown.showId}/rundown/${res.rundownId}`);
  return { ok: true };
}

export async function editItem(
  raw: z.infer<typeof EditItemSchema>,
): Promise<FormResponse> {
  const data = EditItemSchema.safeParse(raw);
  if (!data.success) {
    return zodErrorResponse(data.error);
  }
  const res = await db.rundownItem.update({
    where: {
      id: data.data.itemID,
    },
    data: {
      name: data.data.name,
      type: data.data.type,
      durationSeconds: data.data.durationSeconds,
      notes: data.data.notes,
      rundown: {
        update: {
          show: {
            update: {
              version: {
                increment: 1,
              },
            },
          },
        },
      },
    },
    include: {
      rundown: true,
    },
  });
  revalidatePath(`/shows/${res.rundown.showId}/rundown/${res.rundown.id}`);
  return { ok: true };
}

export async function deleteItem(rundownID: number, itemID: number) {
  const res = await db.$transaction(async ($db) => {
    const oldItem = await $db.rundownItem.delete({
      where: {
        id: itemID,
      },
    });
    if (!oldItem) {
      notFound();
    }
    await $db.rundownItem.updateMany({
      where: {
        rundownId: rundownID,
        order: {
          gt: oldItem.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });
    const res = await $db.rundown.update({
      where: {
        id: rundownID,
      },
      data: {
        show: {
          update: {
            version: {
              increment: 1,
            },
          },
        },
      },
    });
    await ensureContiguousDEV(rundownID, $db);
    return res;
  });
  revalidatePath(`/shows/${res.showId}/rundown/${res.id}`);
}

export async function reorder(
  rundownID: number,
  itemID: number,
  newOrder: number,
) {
  const showID = await db.$transaction(async ($db) => {
    const rundown = await $db.rundown.findFirst({
      where: {
        id: rundownID,
      },
      include: {
        items: true,
      },
    });
    if (!rundown) {
      notFound();
    }
    const oldItem = rundown.items.find((item) => item.id === itemID);
    if (!oldItem) {
      notFound();
    }
    const oldOrder = oldItem.order;
    console.debug(
      `Rundown ${rundownID}: moving ${oldItem.name} from ${oldOrder} to ${newOrder}`,
    );

    // the rundowns_items tables don't have unique constraints.
    // See the comment in schema.prisma for the background on this.

    // If the item is moving down, we need to move all items between the old and new position (including new) up one.
    // If the item is moving up, we need to move all items between the new and old position (including new) down one.
    // Remember that order is ascending, so moving an item "down" actually means incrementing its position.
    if (oldOrder < newOrder) {
      // Moving up, therefore incrementing order of all items in between
      await $db.rundownItem.updateMany({
        where: {
          rundownId: rundownID,
          order: {
            gte: oldOrder,
            lte: newOrder,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    } else {
      // Moving down, therefore decrementing order of all items in between
      await $db.rundownItem.updateMany({
        where: {
          rundownId: rundownID,
          order: {
            lte: oldOrder,
            gte: newOrder,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }
    await $db.rundownItem.update({
      where: {
        id: itemID,
      },
      data: {
        order: newOrder,
        rundown: {
          update: {
            show: {
              update: {
                version: {
                  increment: 1,
                },
              },
            },
          },
        },
      },
    });
    await ensureContiguousDEV(rundownID, $db);
    return rundown.showId;
  });
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
}

async function ensureContiguousDEV(
  rundownID: number,
  $db: Parameters<Parameters<typeof db.$transaction>[0]>[0],
) {
  if (process.env.NODE_ENV !== "production") {
    // Sanity check: ensure all items have a contiguous order, otherwise this will break next time
    const rundown = await $db.rundown.findUniqueOrThrow({
      where: {
        id: rundownID,
      },
      include: {
        items: {
          orderBy: { order: "asc" },
        },
      },
    });
    const items = rundown.items.map((i) => i.order);

    if (items.length >= 2) {
      for (let i = 1; i < items.length - 1; i++) {
        if (items[i] !== items[i - 1] + 1) {
          throw new Error(
            `Invariant violation: non-contiguous order for items of rundown ${rundownID}; item ${i} has order ${
              items[i]
            } but item ${i - 1} has order ${items[i - 1]}`,
          );
        }
      }
    }
    if (items.length > 0 && items[items.length - 1] !== items.length - 1) {
      throw new Error(
        `Invariant violation: non-contiguous order for items of rundown ${rundownID}; last item has order ${
          items[items.length - 1]
        } but there are ${items.length} items`,
      );
    }
  }
}

export async function processUploadForRundownItem(
  itemID: number,
  fileName: string,
  uploadURL: string,
) {
  const item = await db.rundownItem.findUnique({
    where: {
      id: itemID,
    },
    include: {
      rundown: true,
    },
  });
  if (!item) {
    throw new Error("Invalid item ID");
  }

  // Sanity check to ensure it was really uploaded where we expected
  if (!uploadURL.startsWith(getPublicTusEndpoint())) {
    throw new Error("Invalid upload URL");
  }

  const baseJobID = await db.$transaction(async ($db) => {
    // If the pre-existing media isn't used on any other items, delete it
    await $db.media.deleteMany({
      where: {
        rundownItems: {
          every: {
            id: itemID,
          },
        },
        continuityItems: {
          none: {},
        },
        assets: {
          none: {},
        },
      },
    });
    const media = await $db.media.create({
      data: {
        name: fileName,
        durationSeconds: 0,
        rawPath: "",
        rundownItems: {
          connect: {
            id: itemID,
          },
        },
      },
    });
    await $db.rundown.update({
      where: {
        id: item.rundown.id,
      },
      data: {
        show: {
          update: {
            version: {
              increment: 1,
            },
          },
        },
      },
    });
    const job = await $db.baseJob.create({
      data: {
        jobType: "ProcessMediaJob",
        jobPayload: {
          mediaId: media.id,
          sourceType: "Tus",
          source: uploadUrlToPath(uploadURL),
        },
      },
    });
    return job.id;
  });
  await dispatchJobForJobrunner(baseJobID);
  revalidatePath(`/shows/${item.rundown.showId}`);
  return { ok: true };
}

export async function attachExistingMediaToRundownItem(
  itemID: number,
  mediaID: number,
) {
  const res = await db.$transaction(async ($db) => {
    const media = await $db.media.findUniqueOrThrow({
      where: {
        id: mediaID,
      },
    });
    return await $db.rundownItem.update({
      data: {
        durationSeconds: media.durationSeconds,
        media: {
          connect: {
            id: mediaID,
          },
        },
        rundown: {
          update: {
            show: {
              update: {
                version: {
                  increment: 1,
                },
              },
            },
          },
        },
      },
      where: {
        id: itemID,
      },
      include: {
        rundown: true,
      },
    });
  });
  revalidatePath(`/shows/${res.rundown.showId}`);
  return { ok: true };
}

// TODO: duplicated with show actions
export async function retryProcessingMedia(
  mediaID: number,
  showID: number,
  rundownID: number,
) {
  // Reset the job status and re-enqueue it
  const baseJob = await db.$transaction(async ($db) => {
    const baseJob = await $db.baseJob.findUniqueOrThrow({
      where: {
        id: mediaID,
      },
    });
    await $db.media.update({
      where: {
        id: mediaID,
      },
      data: {
        state: MediaState.Pending,
      },
    });
    return await $db.baseJob.update({
      where: {
        id: baseJob.id,
      },
      data: {
        state: JobState.Pending,
        completedAt: null,
        startedAt: null,
        workerId: null,
        externalJobID: null,
        externalJobProvider: null,
      },
    });
  });
  await dispatchJobForJobrunner(baseJob.id);
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
  return { ok: true };
}

export async function reprocessMedia(id: number) {
  const [staleMedia, baseJob] = await db.$transaction(async ($db) => {
    const media = await $db.media.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        rundownItems: {
          include: {
            rundown: true,
          },
        },
      },
    });
    invariant(
      media.state === MediaState.Archived,
      "can only reprocess archived media",
    );
    invariant(media.rawPath, "can only reprocess media with a raw path");
    await $db.media.update({
      where: {
        id,
      },
      data: {
        state: MediaState.Pending,
      },
    });
    const job = await $db.baseJob.create({
      data: {
        jobType: "ProcessMediaJob",
        jobPayload: {
          mediaId: id,
          sourceType: "S3",
          source: media.rawPath,
        },
      },
    });
    return [media, job];
  });
  await dispatchJobForJobrunner(baseJob.id);
  revalidatePath("/media");
  for (const r of staleMedia.rundownItems.map((ri) => ri.rundown)) {
    revalidatePath(`/shows/${r.showId}`);
  }
  return { ok: true };
}
