import type { Prisma } from "../../client";
import { z } from "zod";

export const RundownCreateManyShowInputSchema: z.ZodType<Prisma.RundownCreateManyShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      order: z.number().int(),
    })
    .strict();

export default RundownCreateManyShowInputSchema;
