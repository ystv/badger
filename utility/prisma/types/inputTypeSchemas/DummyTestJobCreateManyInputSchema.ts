import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobCreateManyInputSchema: z.ZodType<Prisma.DummyTestJobCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      baseJobId: z.number().int(),
    })
    .strict();

export default DummyTestJobCreateManyInputSchema;
