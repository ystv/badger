import { z } from 'zod';
import type { Prisma } from '../../client';

export const RundownCountOutputTypeSelectSchema: z.ZodType<Prisma.RundownCountOutputTypeSelect> = z.object({
  items: z.boolean().optional(),
  assets: z.boolean().optional(),
  metadata: z.boolean().optional(),
}).strict();

export default RundownCountOutputTypeSelectSchema;
