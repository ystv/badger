"use server";

import {
  AssetTypeSchema,
  AssetTypeType,
} from "@/lib/db/types/inputTypeSchemas/AssetTypeSchema";
import { FormResponse } from "@/components/Form";
import { db } from "@/lib/db";
import { escapeRegExp } from "lodash";
import { revalidatePath } from "next/cache";

export async function processAssetUpload(
  rundownID: number,
  type: AssetTypeType,
  fileName: string,
  uploadURL: string,
): Promise<FormResponse> {
  // Sanity check to ensure it was really uploaded where we expected
  if (!uploadURL.startsWith(process.env.TUS_ENDPOINT!)) {
    throw new Error("Invalid upload URL");
  }

  type = AssetTypeSchema.parse(type);

  const rundown = await db.rundown.findUniqueOrThrow({
    where: {
      id: rundownID,
    },
  });

  await db.asset.create({
    data: {
      name: fileName,
      type,
      rundown: {
        connect: rundown,
      },
      loadJobs: {
        create: {
          sourceType: "Tus",
          source: uploadURL.replace(
            new RegExp(`^${escapeRegExp(process.env.TUS_ENDPOINT!)}/?`),
            "",
          ),
          base_job: {
            create: {},
          },
        },
      },
    },
  });

  revalidatePath("/shows/[show_id]/rundown/[rundown_id]");
  return { ok: true };
}

export async function removeAsset(assetID: number) {
  await db.asset.delete({
    where: {
      id: assetID,
    },
  });
  return { ok: true };
}
