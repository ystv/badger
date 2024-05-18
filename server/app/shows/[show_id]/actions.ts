"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";
import { editContinuityItemSchema } from "./schema";
import { FormResponse } from "@/components/Form";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import {
  JobState,
  MediaFileSourceType,
  MediaState,
  MetadataTargetType,
  Prisma,
} from "@badger/prisma/client";
import { escapeRegExp } from "lodash";

import { dispatchJobForJobrunner } from "@/lib/jobs";
import invariant from "@/lib/invariant";
import type {
  MediaMetaSelectValue,
  MediaMetaUploadValue,
} from "@/components/Metadata";
import { getPublicTusEndpoint } from "@/lib/tus";

export async function revalidateIfChanged(showID: number, version: number) {
  const show = await db.show.findUnique({
    where: {
      id: showID,
    },
    select: {
      version: true,
    },
  });
  if (!show) {
    notFound();
  }
  if (show.version !== version) {
    revalidatePath(`/shows/${showID}`);
  }
}

export async function addItem(
  showID: number,
  type: "rundown" | "continuity_item",
  name: string,
  duration?: number,
) {
  await db.$transaction(async ($db) => {
    const highestOrder = await $db.$queryRaw<[{ order: number }]>`
      SELECT COALESCE(
        GREATEST(
          (SELECT MAX("order") FROM "rundowns" WHERE "showId" = ${showID}),
          (SELECT MAX("order") FROM "continuity_items" WHERE "showId" = ${showID})
        ),
        -1 -- to ensure that the first item is 0-indexed
      ) AS "order"
    `;
    const order = highestOrder[0].order + 1;
    if (type === "rundown") {
      await $db.rundown.create({
        data: {
          name,
          order,
          show: {
            connect: { id: showID },
          },
        },
      });
    } else {
      await $db.continuityItem.create({
        data: {
          name,
          order,
          durationSeconds: duration ?? 0,
          show: {
            connect: { id: showID },
          },
        },
      });
    }
    await $db.show.update({
      where: {
        id: showID,
      },
      data: {
        version: {
          increment: 1,
        },
      },
    });
  });
  revalidatePath(`/shows/${showID}`);
  return { ok: true };
}

// rundowns are handled on their own page (or at least will be - TODO)
export async function editContinuityItem(
  raw: z.infer<typeof editContinuityItemSchema>,
): Promise<FormResponse> {
  const data = editContinuityItemSchema.safeParse(raw);
  if (!data.success) {
    return zodErrorResponse(data.error);
  }
  const res = await db.continuityItem.update({
    where: {
      id: data.data.itemID,
    },
    data: {
      name: data.data.name,
      durationSeconds: data.data.duration,
      show: {
        update: {
          version: {
            increment: 1,
          },
        },
      },
    },
  });
  revalidatePath(`/shows/${res.showId}`);
  return { ok: true };
}

export async function deleteItem(
  showID: number,
  itemType: "rundown" | "continuity_item",
  itemId: number,
) {
  await db.$transaction(async ($db) => {
    let oldItem;
    if (itemType === "rundown") {
      oldItem = await $db.rundown.delete({
        where: {
          id: itemId,
        },
      });
    } else if (itemType === "continuity_item") {
      oldItem = await $db.continuityItem.delete({
        where: {
          id: itemId,
        },
      });
    } else {
      throw new Error("Invalid item type");
    }
    // Ensure order remains contiguous
    await $db.rundown.updateMany({
      where: {
        showId: showID,
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
    await $db.continuityItem.updateMany({
      where: {
        showId: showID,
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
    await $db.show.update({
      where: {
        id: showID,
      },
      data: {
        version: {
          increment: 1,
        },
      },
    });
    await ensureContiguousDEV(showID, $db);
  });
  revalidatePath(`/shows/${showID}`);
}

export async function reorderShowItems(
  showID: number,
  itemType: "rundown" | "continuity_item",
  itemId: number,
  newOrder: number,
) {
  await db.$transaction(async ($db) => {
    // TODO: the rundowns and continuity_items tables don't have unique constraints.
    // See the comment in schema.prisma for the background on this.

    const show = await $db.show.findUnique({
      where: {
        id: showID,
      },
      include: {
        rundowns: true,
        continuityItems: true,
      },
    });
    if (!show) {
      notFound();
    }

    // If the item is moving down, we need to move all items between the old and new position up one.
    // If the item is moving up, we need to move all items between the new and old position down one.
    // Remember that order is ascending, so moving an item "down" actually means incrementing its position.
    const oldItem =
      itemType === "rundown"
        ? show.rundowns.find((x) => x.id === itemId)
        : show.continuityItems.find((x) => x.id === itemId);
    if (!oldItem) {
      throw new Error("Invalid item ID");
    }
    const oldOrder = oldItem.order;
    console.debug(
      `Moving ${itemType} ${itemId} from ${oldOrder} to ${newOrder}`,
    );
    if (oldOrder < newOrder) {
      // Moving down, so the item's order will be incremented
      await $db.rundown.updateMany({
        where: {
          showId: showID,
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
      await $db.continuityItem.updateMany({
        where: {
          showId: showID,
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
      // Moving up, so the item's order will be decremented
      await $db.rundown.updateMany({
        where: {
          showId: showID,
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
      await $db.continuityItem.updateMany({
        where: {
          showId: showID,
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

    if (itemType === "rundown") {
      await $db.rundown.update({
        where: {
          id: itemId,
        },
        data: {
          order: newOrder,
        },
      });
    } else if (itemType === "continuity_item") {
      await $db.continuityItem.update({
        where: {
          id: itemId,
        },
        data: {
          order: newOrder,
        },
      });
    } else {
      throw new Error("Invalid item type");
    }

    await $db.show.update({
      where: {
        id: showID,
      },
      data: {
        version: {
          increment: 1,
        },
      },
    });

    await ensureContiguousDEV(showID, $db);
  });
  revalidatePath(`/shows/${showID}`);
  return { ok: true };
}

function isMediaMetaSelectValue(
  value: Prisma.InputJsonValue | MediaMetaSelectValue | MediaMetaUploadValue,
): value is MediaMetaSelectValue {
  return typeof value === "object" && value !== null && "mediaId" in value;
}

function isMediaMetaUploadValue(
  value: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
): value is MediaMetaUploadValue {
  return typeof value === "object" && value !== null && "uploadUrl" in value;
}

export async function setMetaValue(
  showID: number,
  metaID: number,
  newValue: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
): Promise<FormResponse> {
  await db.$transaction(async ($db) => {
    const meta = await $db.metadata.findUnique({
      where: {
        id: metaID,
      },
      include: {
        field: true,
      },
    });
    invariant(meta, "Invalid metadata ID");
    switch (meta.field.type) {
      case "Media":
        {
          invariant(
            typeof newValue === "object" && newValue !== null,
            "invalid media meta object",
          );
          if (isMediaMetaSelectValue(newValue)) {
            await $db.metadata.update({
              where: {
                id: metaID,
              },
              data: {
                media: {
                  connect: {
                    id: newValue.mediaId,
                  },
                },
              },
            });
          } else if (isMediaMetaUploadValue(newValue)) {
            await $db.metadata.update({
              where: {
                id: metaID,
              },
              data: {
                media: {
                  create: {
                    name: newValue.fileName,
                    durationSeconds: 0,
                    rawPath: "",
                    process_jobs: {
                      create: {
                        sourceType: MediaFileSourceType.Tus,
                        source: newValue.uploadUrl.replace(
                          // Strip off the Tus endpoint prefix so the source is just the ID
                          new RegExp(
                            `^${escapeRegExp(getPublicTusEndpoint())}/?`,
                          ),
                          "",
                        ),
                        base_job: {
                          create: {},
                        },
                      },
                    },
                  },
                },
              },
            });
          } else {
            invariant(false, "invalid media meta value");
          }
        }
        break;
      default:
        await $db.metadata.update({
          where: {
            field: {
              target: MetadataTargetType.Show,
            },
            showId: showID,
            id: metaID,
          },
          data: {
            value: newValue as Prisma.InputJsonValue,
          },
        });
    }
  });
  revalidatePath(`/shows/${showID}`);
  return { ok: true };
}

export async function addMeta(
  showID: number,
  fieldID: number,
  newValue: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
): Promise<FormResponse> {
  await db.$transaction(async ($db) => {
    const field = await $db.metadataField.findUnique({
      where: {
        id: fieldID,
      },
    });
    invariant(field, "Invalid metadata field ID");
    switch (field.type) {
      case "Media":
        {
          if (isMediaMetaSelectValue(newValue)) {
            await $db.metadata.create({
              data: {
                field: {
                  connect: {
                    id: fieldID,
                  },
                },
                show: {
                  connect: {
                    id: showID,
                  },
                },
                value: {},
                media: {
                  connect: {
                    id: newValue.mediaId,
                  },
                },
              },
            });
          } else if (isMediaMetaUploadValue(newValue)) {
            await $db.metadata.create({
              data: {
                field: {
                  connect: {
                    id: fieldID,
                  },
                },
                show: {
                  connect: {
                    id: showID,
                  },
                },
                value: {},
                media: {
                  create: {
                    name: newValue.fileName,
                    durationSeconds: 0,
                    rawPath: "",
                    process_jobs: {
                      create: {
                        sourceType: MediaFileSourceType.Tus,
                        source: newValue.uploadUrl.replace(
                          // Strip off the Tus endpoint prefix so the source is just the ID
                          new RegExp(
                            `^${escapeRegExp(getPublicTusEndpoint())}/?`,
                          ),
                          "",
                        ),
                        base_job: {
                          create: {},
                        },
                      },
                    },
                  },
                },
              },
            });
          } else {
            invariant(false, "invalid media meta value");
          }
        }
        break;
      default:
        await $db.metadata.create({
          data: {
            fieldId: fieldID,
            showId: showID,
            value: newValue as Prisma.InputJsonValue,
          },
        });
    }
  });
  revalidatePath(`/shows/${showID}`);
  return { ok: true };
}

async function ensureContiguousDEV(
  showID: number,
  $db: Parameters<Parameters<typeof db.$transaction>[0]>[0],
) {
  if (process.env.NODE_ENV !== "production") {
    // Sanity check: ensure all items have a contiguous order, otherwise this will break next time
    const show = await $db.show.findUnique({
      where: {
        id: showID,
      },
      include: {
        rundowns: true,
        continuityItems: true,
      },
    });
    if (!show) {
      notFound();
    }
    const allItems = [...show.rundowns, ...show.continuityItems]
      .map((x) => x.order)
      .sort((a, b) => a - b);
    if (allItems.length >= 2) {
      for (let i = 1; i < allItems.length - 1; i++) {
        if (allItems[i] !== allItems[i - 1] + 1) {
          throw new Error(
            `Invariant violation: non-contiguous order for items of show ${showID}; item ${i} has order ${
              allItems[i]
            } but item ${i - 1} has order ${allItems[i - 1]}`,
          );
        }
      }
    }
    if (
      allItems.length > 0 &&
      allItems[allItems.length - 1] !== allItems.length - 1
    ) {
      throw new Error(
        `Invariant violation: non-contiguous order for items of show ${showID}; last item has order ${
          allItems[allItems.length - 1]
        } but there are ${allItems.length} items`,
      );
    }
  }
}

export async function processUploadForContinuityItem(
  itemID: number,
  fileName: string,
  uploadURL: string,
) {
  const item = await db.continuityItem.findUnique({
    where: {
      id: itemID,
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
    await $db.media.deleteMany({
      where: {
        continuityItems: {
          every: {
            id: itemID,
          },
        },
        rundownItems: {
          none: {},
        },
        assets: {
          none: {},
        },
      },
    });
    const res = await $db.media.create({
      data: {
        name: fileName,
        durationSeconds: 0,
        rawPath: "",
        continuityItems: {
          connect: {
            id: itemID,
          },
        },
        process_jobs: {
          create: {
            sourceType: MediaFileSourceType.Tus,
            source: uploadURL.replace(
              // Strip off the Tus endpoint prefix so the source is just the ID
              new RegExp(`^${escapeRegExp(getPublicTusEndpoint())}/?`),
              "",
            ),
            base_job: {
              create: {},
            },
          },
        },
      },
      include: {
        process_jobs: true,
      },
    });
    await $db.show.update({
      where: {
        id: item.showId,
      },
      data: {
        version: {
          increment: 1,
        },
      },
    });
    return res.process_jobs[0].base_job_id;
  });
  await dispatchJobForJobrunner(baseJobID);
  revalidatePath(`/shows/${item.showId}`);
  return { ok: true };
}

export async function attachExistingMediaToContinuityItem(
  itemID: number,
  mediaID: number,
) {
  const item = await db.$transaction(async ($db) => {
    const media = await $db.media.findUniqueOrThrow({
      where: {
        id: mediaID,
      },
      include: {
        continuityItems: true,
      },
    });
    return await $db.continuityItem.update({
      where: {
        id: itemID,
      },
      data: {
        media: {
          connect: {
            id: mediaID,
          },
        },
        durationSeconds: media.durationSeconds,
        show: {
          update: {
            version: {
              increment: 1,
            },
          },
        },
      },
    });
  });
  revalidatePath(`/shows/${item.showId}`);
  return { ok: true };
}

export async function retryProcessingMedia(mediaID: number, showID: number) {
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
  revalidatePath(`/shows/${showID}`);
  return { ok: true };
}

export async function reprocessMedia(id: number) {
  const [staleMedia, baseJob] = await db.$transaction(async ($db) => {
    const media = await $db.media.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        continuityItems: true,
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
    const job = await $db.processMediaJob.create({
      data: {
        sourceType: MediaFileSourceType.S3,
        source: media.rawPath,
        media: {
          connect: {
            id,
          },
        },
        base_job: {
          create: {},
        },
      },
      include: {
        base_job: true,
      },
    });
    return [media, job.base_job];
  });
  await dispatchJobForJobrunner(baseJob.id);
  revalidatePath("/media");
  for (const ci of staleMedia.continuityItems) {
    revalidatePath(`/shows/${ci.showId}`);
  }
  return { ok: true };
}
