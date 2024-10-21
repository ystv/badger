import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownFindManyArgsSchema } from "../outputTypeSchemas/RundownFindManyArgsSchema"
import { ContinuityItemFindManyArgsSchema } from "../outputTypeSchemas/ContinuityItemFindManyArgsSchema"
import { MetadataFindManyArgsSchema } from "../outputTypeSchemas/MetadataFindManyArgsSchema"
import { ShowCountOutputTypeArgsSchema } from "../outputTypeSchemas/ShowCountOutputTypeArgsSchema"

export const ShowIncludeSchema: z.ZodType<Prisma.ShowInclude> = z.object({
  rundowns: z.union([z.boolean(),z.lazy(() => RundownFindManyArgsSchema)]).optional(),
  continuityItems: z.union([z.boolean(),z.lazy(() => ContinuityItemFindManyArgsSchema)]).optional(),
  metadata: z.union([z.boolean(),z.lazy(() => MetadataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ShowIncludeSchema;
