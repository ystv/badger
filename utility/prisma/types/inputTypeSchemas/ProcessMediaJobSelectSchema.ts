import { z } from "zod";
import type { Prisma } from "../../client";
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema";
import { BaseJobArgsSchema } from "../outputTypeSchemas/BaseJobArgsSchema";

export const ProcessMediaJobSelectSchema: z.ZodType<Prisma.ProcessMediaJobSelect> =
  z
    .object({
      id: z.boolean().optional(),
      mediaId: z.boolean().optional(),
      sourceType: z.boolean().optional(),
      source: z.boolean().optional(),
      base_job_id: z.boolean().optional(),
      media: z.union([z.boolean(), z.lazy(() => MediaArgsSchema)]).optional(),
      base_job: z
        .union([z.boolean(), z.lazy(() => BaseJobArgsSchema)])
        .optional(),
    })
    .strict();

export default ProcessMediaJobSelectSchema;
