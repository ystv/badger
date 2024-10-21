import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateNestedOneWithoutContinuityItemsInputSchema } from './MediaCreateNestedOneWithoutContinuityItemsInputSchema';
import { ShowCreateNestedOneWithoutContinuityItemsInputSchema } from './ShowCreateNestedOneWithoutContinuityItemsInputSchema';

export const ContinuityItemCreateInputSchema: z.ZodType<Prisma.ContinuityItemCreateInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  media: z.lazy(() => MediaCreateNestedOneWithoutContinuityItemsInputSchema).optional(),
  show: z.lazy(() => ShowCreateNestedOneWithoutContinuityItemsInputSchema)
}).strict();

export default ContinuityItemCreateInputSchema;
