import { z } from "zod";
import type { Prisma } from "../../client";

export const BaseJobCountOutputTypeSelectSchema: z.ZodType<Prisma.BaseJobCountOutputTypeSelect> =
  z
    .object({
      DummyTestJob: z.boolean().optional(),
    })
    .strict();

export default BaseJobCountOutputTypeSelectSchema;
