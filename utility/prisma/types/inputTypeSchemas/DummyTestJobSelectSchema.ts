import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const DummyTestJobSelectSchema: z.ZodType<Prisma.DummyTestJobSelect> = z
  .object({
    id: z.boolean().optional(),
    baseJobId: z.boolean().optional(),
    base_job: z
      .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
      .optional(),
  })
  .strict();

export default DummyTestJobSelectSchema;
