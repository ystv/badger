import { z } from "zod";
import type { Prisma } from "../../client";
import { RundownItemArgsSchema } from "../outputTypeSchemas/RundownItemArgsSchema";
import { ContinuityItemArgsSchema } from "../outputTypeSchemas/ContinuityItemArgsSchema";
import { MediaProcessingTaskFindManyArgsSchema } from "../outputTypeSchemas/MediaProcessingTaskFindManyArgsSchema";
import { ProcessMediaJobFindManyArgsSchema } from "../outputTypeSchemas/ProcessMediaJobFindManyArgsSchema";
import { AssetArgsSchema } from "../outputTypeSchemas/AssetArgsSchema";
import { MediaCountOutputTypeArgsSchema } from "../outputTypeSchemas/MediaCountOutputTypeArgsSchema";

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z
  .object({
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

export default MediaIncludeSchema;
