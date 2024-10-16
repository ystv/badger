"use server";

import { schema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { FormResponse } from "@/components/Form";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";

export async function doEdit(
  data: z.infer<typeof schema>,
): Promise<FormResponse> {
  await requirePermission("ManageShows");
  const result = schema.safeParse(data);
  if (!result.success) {
    return zodErrorResponse(result.error);
  }
  const res = await db.show.update({
    where: { id: result.data.id },
    data: {
      name: result.data.name,
      start: result.data.start,
    },
  });
  revalidatePath(`/`);
  revalidatePath(`/shows/${res.id}`);
  return { ok: true, id: res.id };
}
