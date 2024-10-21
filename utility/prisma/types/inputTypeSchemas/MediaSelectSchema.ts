import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemFindManyArgsSchema } from "../outputTypeSchemas/RundownItemFindManyArgsSchema"
import { ContinuityItemFindManyArgsSchema } from "../outputTypeSchemas/ContinuityItemFindManyArgsSchema"
import { MediaProcessingTaskFindManyArgsSchema } from "../outputTypeSchemas/MediaProcessingTaskFindManyArgsSchema"
import { AssetFindManyArgsSchema } from "../outputTypeSchemas/AssetFindManyArgsSchema"
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { MediaCountOutputTypeArgsSchema } from "../outputTypeSchemas/MediaCountOutputTypeArgsSchema"

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  rawPath: z.boolean().optional(),
  path: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  state: z.boolean().optional(),
  rundownItems: z.union([z.boolean(),z.lazy(() => RundownItemFindManyArgsSchema)]).optional(),
  continuityItems: z.union([z.boolean(),z.lazy(() => ContinuityItemFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => MediaProcessingTaskFindManyArgsSchema)]).optional(),
  assets: z.union([z.boolean(),z.lazy(() => AssetFindManyArgsSchema)]).optional(),
  metadata: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MediaSelectSchema;
