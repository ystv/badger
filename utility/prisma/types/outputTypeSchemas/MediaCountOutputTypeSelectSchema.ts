import { z } from 'zod';
import type { Prisma } from '../../client';

export const MediaCountOutputTypeSelectSchema: z.ZodType<Prisma.MediaCountOutputTypeSelect> = z.object({
  rundownItems: z.boolean().optional(),
  continuityItems: z.boolean().optional(),
  tasks: z.boolean().optional(),
  assets: z.boolean().optional(),
  metadata: z.boolean().optional(),
}).strict();

export default MediaCountOutputTypeSelectSchema;
