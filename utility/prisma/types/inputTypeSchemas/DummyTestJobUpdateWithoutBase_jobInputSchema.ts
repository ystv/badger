import type { Prisma } from "../../client";
import { z } from "zod";

export const DummyTestJobUpdateWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpdateWithoutBase_jobInput> =
  z.object({}).strict();

export default DummyTestJobUpdateWithoutBase_jobInputSchema;
