import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateNestedOneWithoutContinuityItemsInputSchema } from './MediaCreateNestedOneWithoutContinuityItemsInputSchema';

export const ContinuityItemCreateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemCreateWithoutShowInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  media: z.lazy(() => MediaCreateNestedOneWithoutContinuityItemsInputSchema).optional()
}).strict();

export default ContinuityItemCreateWithoutShowInputSchema;
