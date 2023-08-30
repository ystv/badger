import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemTypeSchema } from "./RundownItemTypeSchema";

export const RundownItemCreateManyInputSchema: z.ZodType<Prisma.RundownItemCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rundownId: z.number().int(),
      order: z.number().int(),
      durationSeconds: z.number().int(),
      type: z.lazy(() => RundownItemTypeSchema),
      notes: z.string().optional(),
    })
    .strict();

export default RundownItemCreateManyInputSchema;
