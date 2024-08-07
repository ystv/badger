"use server";

import { FormResponse } from "@/components/Form";
import type {
  MediaMetaUploadValue,
  MediaMetaSelectValue,
} from "@/components/Metadata";
import { db } from "@/lib/db";
import invariant from "@/lib/invariant";
import { uploadUrlToPath } from "@/lib/tus";
import { MetadataTargetType, type Prisma } from "@badger/prisma/client";
import { revalidatePath } from "next/cache";

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
  rundownID: number,
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
    invariant(meta, "Meta not found");
    switch (meta.field.type) {
      case "Media":
        {
          if (isMediaMetaUploadValue(newValue)) {
            const md = await $db.metadata.update({
              where: {
                id: metaID,
              },
              data: {
                value: {},
                media: {
                  create: {
                    name: newValue.fileName,
                    durationSeconds: 0,
                    rawPath: "",
                  },
                },
              },
            });
            await $db.baseJob.create({
              data: {
                jobType: "ProcessMediaJob",
                jobPayload: {
                  sourceType: "Tus",
                  source: uploadUrlToPath(newValue.uploadUrl),
                  mediaId: md.mediaId,
                },
              },
            });
          } else if (isMediaMetaSelectValue(newValue)) {
            await $db.metadata.update({
              where: {
                id: metaID,
              },
              data: {
                value: {},
                media: {
                  connect: {
                    id: newValue.mediaId,
                  },
                },
              },
            });
          } else {
            invariant(false, "Invalid media metadata value");
          }
        }
        break;
      default:
        await $db.metadata.update({
          where: {
            field: {
              target: MetadataTargetType.Rundown,
            },
            rundownId: rundownID,
            id: metaID,
          },
          data: {
            value: newValue as Prisma.InputJsonValue,
          },
        });
    }
  });
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
  return { ok: true };
}

export async function addMeta(
  showID: number,
  rundownID: number,
  fieldID: number,
  newValue: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
): Promise<FormResponse> {
  await db.$transaction(async ($db) => {
    const field = await $db.metadataField.findUnique({
      where: {
        id: fieldID,
      },
    });
    invariant(field, "Field not found");
    switch (field.type) {
      case "Media": {
        if (isMediaMetaUploadValue(newValue)) {
          const md = await $db.metadata.create({
            data: {
              field: {
                connect: {
                  id: fieldID,
                },
              },
              rundown: {
                connect: {
                  id: rundownID,
                },
              },
              value: {},
              media: {
                create: {
                  name: newValue.fileName,
                  durationSeconds: 0,
                  rawPath: "",
                },
              },
            },
          });
          await $db.baseJob.create({
            data: {
              jobType: "ProcessMediaJob",
              jobPayload: {
                sourceType: "Tus",
                source: uploadUrlToPath(newValue.uploadUrl),
                mediaId: md.mediaId,
              },
            },
          });
        } else if (isMediaMetaSelectValue(newValue)) {
          await $db.metadata.create({
            data: {
              fieldId: fieldID,
              rundownId: rundownID,
              value: {},
              mediaId: newValue.mediaId,
            },
          });
        } else {
          invariant(false, "Invalid media metadata value");
        }
        break;
      }
      default:
        await $db.metadata.create({
          data: {
            fieldId: fieldID,
            rundownId: rundownID,
            value: newValue as Prisma.InputJsonValue,
          },
        });
    }
  });
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
  return { ok: true };
}
