import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const DummyTestJobIncludeSchema: z.ZodType<Prisma.DummyTestJobInclude> =
  z
    .object({
      base_job: z
        .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
        .optional(),
    })
    .strict();

export default DummyTestJobIncludeSchema;
