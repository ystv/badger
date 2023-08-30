import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobCreateWithoutBase_jobInput> =
  z.object({}).strict();

export default DummyTestJobCreateWithoutBase_jobInputSchema;
