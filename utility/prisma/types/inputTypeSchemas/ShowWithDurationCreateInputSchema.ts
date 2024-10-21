import type { Prisma } from '../../client';

import { z } from 'zod';

export const ShowWithDurationCreateInputSchema: z.ZodType<Prisma.ShowWithDurationCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.coerce.date(),
  durationSeconds: z.number().int(),
  end: z.coerce.date(),
  version: z.number().int().optional(),
  ytStreamID: z.string().optional().nullable(),
  ytBroadcastID: z.string().optional().nullable()
}).strict();

export default ShowWithDurationCreateInputSchema;
