import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemFindManyArgsSchema } from "../outputTypeSchemas/RundownItemFindManyArgsSchema"
import { ContinuityItemFindManyArgsSchema } from "../outputTypeSchemas/ContinuityItemFindManyArgsSchema"
import { MediaProcessingTaskFindManyArgsSchema } from "../outputTypeSchemas/MediaProcessingTaskFindManyArgsSchema"
import { AssetFindManyArgsSchema } from "../outputTypeSchemas/AssetFindManyArgsSchema"
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { MediaCountOutputTypeArgsSchema } from "../outputTypeSchemas/MediaCountOutputTypeArgsSchema"

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z.object({
  rundownItems: z.union([z.boolean(),z.lazy(() => RundownItemFindManyArgsSchema)]).optional(),
  continuityItems: z.union([z.boolean(),z.lazy(() => ContinuityItemFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => MediaProcessingTaskFindManyArgsSchema)]).optional(),
  assets: z.union([z.boolean(),z.lazy(() => AssetFindManyArgsSchema)]).optional(),
  metadata: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MediaIncludeSchema;
