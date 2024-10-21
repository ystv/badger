import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';

export const RundownItemCreateManyRundownInputSchema: z.ZodType<Prisma.RundownItemCreateManyRundownInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  type: z.lazy(() => RundownItemTypeSchema),
  notes: z.string().optional(),
  mediaId: z.number().int().optional().nullable()
}).strict();

export default RundownItemCreateManyRundownInputSchema;
