import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"
import { RundownArgsSchema } from "../outputTypeSchemas/RundownArgsSchema"

export const AssetIncludeSchema: z.ZodType<Prisma.AssetInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  rundown: z.union([z.boolean(),z.lazy(() => RundownArgsSchema)]).optional(),
}).strict()

export default AssetIncludeSchema;
