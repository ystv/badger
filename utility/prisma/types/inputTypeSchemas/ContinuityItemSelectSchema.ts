import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"

export const ContinuityItemSelectSchema: z.ZodType<Prisma.ContinuityItemSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  order: z.boolean().optional(),
  showId: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  ytBroadcastID: z.boolean().optional(),
  mediaId: z.boolean().optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export default ContinuityItemSelectSchema;
