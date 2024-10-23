import type { Prisma } from '../../client';

import { z } from 'zod';

export const ContinuityItemCreateManyShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateManyShowInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  mediaId: z.number().int().optional().nullable()
}).strict();

export default ContinuityItemCreateManyShowInputSchema;
