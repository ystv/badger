"use server";

import { FormResponse } from "@/components/Form";
import { db } from "@/lib/db";
import { escapeRegExp } from "lodash";
import { revalidatePath } from "next/cache";

import { dispatchJobForJobrunner } from "@/lib/jobs";
import { getPublicTusEndpoint, uploadUrlToPath } from "@/lib/tus";

export async function processAssetUpload(
  rundownID: number,
  category: string,
  fileName: string,
  uploadURL: string,
): Promise<FormResponse> {
  // Sanity check to ensure it was really uploaded where we expected
  if (!uploadURL.startsWith(getPublicTusEndpoint())) {
    throw new Error("Invalid upload URL");
  }

  const [asset, rundown, job] = await db.$transaction(async ($db) => {
    const rundown = await $db.rundown.findUniqueOrThrow({
      where: {
        id: rundownID,
      },
    });

    const nextOrder =
      (await $db.asset.count({
        where: {
          rundownId: rundownID,
          category,
        },
      })) + 1;

    const asset = await $db.asset.create({
      data: {
        name: fileName,
        category,
        order: nextOrder,
        rundown: {
          connect: rundown,
        },
        media: {
          create: {
            name: fileName,
            rawPath: "",
            durationSeconds: 0,
          },
        },
      },
    });
    const job = await $db.baseJob.create({
      data: {
        jobType: "LoadAssetJob",
        jobPayload: {
          assetId: asset.id,
          sourceType: "Tus",
          source: uploadUrlToPath(uploadURL),
        },
      },
    });
    await $db.rundown.update({
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
    return [asset, rundown, job];
  });

  await dispatchJobForJobrunner(job.id);
  revalidatePath(`/shows/${rundown.showId}/rundown/${rundown.id}`);
  return { ok: true };
}

export async function createAssetFromExistingMedia(
  rundownID: number,
  category: string,
  mediaID: number,
) {
  await db.$transaction(async ($db) => {
    const media = await $db.media.findUniqueOrThrow({
      where: {
        id: mediaID,
      },
    });
    const nextOrder =
      (await $db.asset.count({
        where: {
          rundownId: rundownID,
          category,
        },
      })) + 1;
    await $db.asset.create({
      data: {
        name: media.name,
        category,
        order: nextOrder,
        media: {
          connect: {
            id: mediaID,
          },
        },
        rundown: {
          connect: {
            id: rundownID,
          },
        },
      },
    });
    await $db.rundown.update({
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
  });
  revalidatePath(`/shows/${rundownID}`);
  return { ok: true };
}

export async function removeAsset(assetID: number) {
  const res = await db.$transaction(async ($db) => {
    const res = await $db.asset.update({
      where: {
        id: assetID,
      },
      data: {
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
    await $db.asset.delete({
      where: {
        id: assetID,
      },
    });
    await $db.media.deleteMany({
      where: {
        assets: {
          none: {},
        },
        rundownItems: {
          none: {},
        },
        continuityItems: {
          none: {},
        },
      },
    });
    return res;
  });
  revalidatePath(`/shows/${res.rundown.showId}/rundown/${res.rundown.id}`);
  return { ok: true };
}
