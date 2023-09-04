import { z } from "zod";
import type { Prisma } from "../../client";
import { RundownItemArgsSchema } from "../outputTypeSchemas/RundownItemArgsSchema";
import { ContinuityItemArgsSchema } from "../outputTypeSchemas/ContinuityItemArgsSchema";
import { MediaProcessingTaskFindManyArgsSchema } from "../outputTypeSchemas/MediaProcessingTaskFindManyArgsSchema";
import { ProcessMediaJobFindManyArgsSchema } from "../outputTypeSchemas/ProcessMediaJobFindManyArgsSchema";
import { AssetArgsSchema } from "../outputTypeSchemas/AssetArgsSchema";
import { MediaCountOutputTypeArgsSchema } from "../outputTypeSchemas/MediaCountOutputTypeArgsSchema";

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    rawPath: z.boolean().optional(),
    path: z.boolean().optional(),
    durationSeconds: z.boolean().optional(),
    state: z.boolean().optional(),
    rundownItemID: z.boolean().optional(),
    continuityItemID: z.boolean().optional(),
    rundownItem: z
      .union([z.boolean(), z.lazy(() => RundownItemArgsSchema)])
      .optional(),
    continuityItem: z
      .union([z.boolean(), z.lazy(() => ContinuityItemArgsSchema)])
      .optional(),
    tasks: z
      .union([z.boolean(), z.lazy(() => MediaProcessingTaskFindManyArgsSchema)])
      .optional(),
    process_jobs: z
      .union([z.boolean(), z.lazy(() => ProcessMediaJobFindManyArgsSchema)])
      .optional(),
    asset: z.union([z.boolean(), z.lazy(() => AssetArgsSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MediaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default MediaSelectSchema;
