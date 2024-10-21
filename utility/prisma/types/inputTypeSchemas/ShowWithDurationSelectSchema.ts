import { z } from 'zod';
import type { Prisma } from '../../client';

export const ShowWithDurationSelectSchema: z.ZodType<Prisma.ShowWithDurationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  start: z.boolean().optional(),
  durationSeconds: z.boolean().optional(),
  end: z.boolean().optional(),
  version: z.boolean().optional(),
  ytStreamID: z.boolean().optional(),
  ytBroadcastID: z.boolean().optional(),
}).strict()

export default ShowWithDurationSelectSchema;
