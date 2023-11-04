import { z } from "zod";
import type { Prisma } from "../../client";
import { RundownItemFindManyArgsSchema } from "../outputTypeSchemas/RundownItemFindManyArgsSchema";
import { ContinuityItemFindManyArgsSchema } from "../outputTypeSchemas/ContinuityItemFindManyArgsSchema";
import { MediaProcessingTaskFindManyArgsSchema } from "../outputTypeSchemas/MediaProcessingTaskFindManyArgsSchema";
import { ProcessMediaJobFindManyArgsSchema } from "../outputTypeSchemas/ProcessMediaJobFindManyArgsSchema";
import { AssetFindManyArgsSchema } from "../outputTypeSchemas/AssetFindManyArgsSchema";
import { MediaCountOutputTypeArgsSchema } from "../outputTypeSchemas/MediaCountOutputTypeArgsSchema";

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z
  .object({
    rundownItems: z
      .union([z.boolean(), z.lazy(() => RundownItemFindManyArgsSchema)])
      .optional(),
    continuityItems: z
      .union([z.boolean(), z.lazy(() => ContinuityItemFindManyArgsSchema)])
      .optional(),
    tasks: z
      .union([z.boolean(), z.lazy(() => MediaProcessingTaskFindManyArgsSchema)])
      .optional(),
    process_jobs: z
      .union([z.boolean(), z.lazy(() => ProcessMediaJobFindManyArgsSchema)])
      .optional(),
    assets: z
      .union([z.boolean(), z.lazy(() => AssetFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MediaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default MediaIncludeSchema;
