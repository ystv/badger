import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { MediaCreateNestedOneWithoutRundownItemsInputSchema } from './MediaCreateNestedOneWithoutRundownItemsInputSchema';

export const RundownItemCreateWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateWithoutRundownInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  type: z.lazy(() => RundownItemTypeSchema),
  notes: z.string().optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutRundownItemsInputSchema).optional()
}).strict();

export default RundownItemCreateWithoutRundownInputSchema;
