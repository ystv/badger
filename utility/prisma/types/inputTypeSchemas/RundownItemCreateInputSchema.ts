import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { MediaCreateNestedOneWithoutRundownItemsInputSchema } from './MediaCreateNestedOneWithoutRundownItemsInputSchema';
import { RundownCreateNestedOneWithoutItemsInputSchema } from './RundownCreateNestedOneWithoutItemsInputSchema';

export const RundownItemCreateInputSchema: z.ZodType<Prisma.RundownItemCreateInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  type: z.lazy(() => RundownItemTypeSchema),
  notes: z.string().optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutRundownItemsInputSchema).optional(),
  rundown: z.lazy(() => RundownCreateNestedOneWithoutItemsInputSchema)
}).strict();

export default RundownItemCreateInputSchema;
