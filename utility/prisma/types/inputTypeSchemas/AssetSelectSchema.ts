import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"
import { RundownArgsSchema } from "../outputTypeSchemas/RundownArgsSchema"

export const AssetSelectSchema: z.ZodType<Prisma.AssetSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  category: z.boolean().optional(),
  order: z.boolean().optional(),
  rundownId: z.boolean().optional(),
  mediaId: z.boolean().optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  rundown: z.union([z.boolean(),z.lazy(() => RundownArgsSchema)]).optional(),
}).strict()

export default AssetSelectSchema;
