"use server";

import { FormResponse } from "@/components/Form";
import { db } from "@/lib/db";
import { MetadataTargetType, type Prisma } from "@bowser/prisma/client";
import { revalidatePath } from "next/cache";

export async function setMetaValue(
  showID: number,
  rundownID: number,
  metaID: number,
  newValue: Prisma.InputJsonValue,
): Promise<FormResponse> {
  await db.metadata.update({
    where: {
      field: {
        target: MetadataTargetType.Rundown,
      },
      rundownId: rundownID,
      id: metaID,
    },
    data: {
      value: newValue,
    },
  });
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
  return { ok: true };
}

export async function addMeta(
  showID: number,
  rundownID: number,
  fieldID: number,
  newValue: Prisma.InputJsonValue,
): Promise<FormResponse> {
  await db.metadata.create({
    data: {
      fieldId: fieldID,
      rundownId: rundownID,
      value: newValue,
    },
  });
  revalidatePath(`/shows/${showID}/rundown/${rundownID}`);
  return { ok: true };
}
