import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownFindManyArgsSchema } from "../outputTypeSchemas/RundownFindManyArgsSchema"
import { ContinuityItemFindManyArgsSchema } from "../outputTypeSchemas/ContinuityItemFindManyArgsSchema"
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { ShowCountOutputTypeArgsSchema } from "../outputTypeSchemas/ShowCountOutputTypeArgsSchema"

export const ShowSelectSchema: z.ZodType<Prisma.ShowSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  start: z.boolean().optional(),
  version: z.boolean().optional(),
  ytStreamID: z.boolean().optional(),
  ytBroadcastID: z.boolean().optional(),
  rundowns: z.union([z.boolean(),z.lazy(() => RundownFindManyArgsSchema)]).optional(),
  continuityItems: z.union([z.boolean(),z.lazy(() => ContinuityItemFindManyArgsSchema)]).optional(),
  metadata: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ShowSelectSchema;
