"use server";

import { schema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { FormResponse } from "@/components/Form";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import { z } from "zod";

export async function create(
  data: z.infer<typeof schema>,
): Promise<FormResponse> {
  "use server";
  const result = schema.safeParse(data);
  if (!result.success) {
    return zodErrorResponse(result.error);
  }
  const res = await db.show.create({
    data: {
      name: result.data.name,
      start: result.data.start,
    },
  });
  revalidatePath(`/`);
  revalidatePath(`/shows/${res.id}`);
  return { ok: true, id: res.id }; // TODO: this should not be necessary, a redirect() should suffice
}
