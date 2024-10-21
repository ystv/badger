import { z } from 'zod';
import type { Prisma } from '../../client';

export const ShowCountOutputTypeSelectSchema: z.ZodType<Prisma.ShowCountOutputTypeSelect> = z.object({
  rundowns: z.boolean().optional(),
  continuityItems: z.boolean().optional(),
  metadata: z.boolean().optional(),
}).strict();

export default ShowCountOutputTypeSelectSchema;
