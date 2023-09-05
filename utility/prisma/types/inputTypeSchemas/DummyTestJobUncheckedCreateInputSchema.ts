import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobUncheckedCreateInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      baseJobId: z.number().int(),
    })
    .strict();

export default DummyTestJobUncheckedCreateInputSchema;
