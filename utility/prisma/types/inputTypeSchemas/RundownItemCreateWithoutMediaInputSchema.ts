import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { RundownCreateNestedOneWithoutItemsInputSchema } from './RundownCreateNestedOneWithoutItemsInputSchema';

export const RundownItemCreateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateWithoutMediaInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  type: z.lazy(() => RundownItemTypeSchema),
  notes: z.string().optional(),
  rundown: z.lazy(() => RundownCreateNestedOneWithoutItemsInputSchema)
}).strict();

export default RundownItemCreateWithoutMediaInputSchema;
