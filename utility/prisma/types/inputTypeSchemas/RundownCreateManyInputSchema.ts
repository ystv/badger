import type { Prisma } from '../../client';

import { z } from 'zod';

export const RundownCreateManyInputSchema: z.ZodType<Prisma.RundownCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
  ytBroadcastID: z.string().optional().nullable()
}).strict();

export default RundownCreateManyInputSchema;
