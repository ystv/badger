import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobUncheckedCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedCreateWithoutBase_jobInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export default DummyTestJobUncheckedCreateWithoutBase_jobInputSchema;
