import type { Prisma } from "../../client";
import { z } from "zod";

export const ShowCreateManyInputSchema: z.ZodType<Prisma.ShowCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
    })
    .strict();

export default ShowCreateManyInputSchema;
