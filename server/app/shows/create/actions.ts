"use server";

import { redirect } from "next/navigation";
import { schema } from "./schema";
import { generateErrorMessage } from "zod-error";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { FormResponse } from "@/components/Form";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import { z } from "zod";

export async function create(
  data: z.infer<typeof schema>
): Promise<FormResponse> {
  "use server";
  const result = schema.safeParse(data);
  console.log(result);
  if (!result.success) {
    return zodErrorResponse(result.error);
  }
  const res = await db.show.create({
    data: {
      name: result.data.name,
      start: result.data.start,
    },
  });
  revalidatePath(`/shows`);
  revalidatePath(`/shows/${res.id}`);
  redirect(`/shows/${res.id}`);
}
