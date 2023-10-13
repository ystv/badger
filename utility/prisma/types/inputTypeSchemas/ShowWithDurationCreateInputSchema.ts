import type { Prisma } from "../../client";
import { z } from "zod";

export const ShowWithDurationCreateInputSchema: z.ZodType<Prisma.ShowWithDurationCreateInput> =
  z
    .object({
      id: z.number().int(),
      name: z.string(),
      start: z.coerce.date(),
      durationSeconds: z.number().int(),
      end: z.coerce.date(),
      version: z.number().int().optional(),
    })
    .strict();

export default ShowWithDurationCreateInputSchema;
