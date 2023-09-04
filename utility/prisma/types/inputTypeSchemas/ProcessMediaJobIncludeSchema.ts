import { z } from "zod";
import type { Prisma } from "../../client";
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const ProcessMediaJobIncludeSchema: z.ZodType<Prisma.ProcessMediaJobInclude> =
  z
    .object({
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
      base_job: z
        .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
        .optional(),
    })
    .strict();

export default ProcessMediaJobIncludeSchema;
