import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobCreateManyBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobCreateManyBase_jobInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export default DummyTestJobCreateManyBase_jobInputSchema;
