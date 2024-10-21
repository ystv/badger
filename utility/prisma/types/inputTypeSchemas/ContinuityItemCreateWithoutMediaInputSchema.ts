import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateNestedOneWithoutContinuityItemsInputSchema } from './ShowCreateNestedOneWithoutContinuityItemsInputSchema';

export const ContinuityItemCreateWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemCreateWithoutMediaInput> = z.object({
  name: z.string(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  ytBroadcastID: z.string().optional().nullable(),
  show: z.lazy(() => ShowCreateNestedOneWithoutContinuityItemsInputSchema)
}).strict();

export default ContinuityItemCreateWithoutMediaInputSchema;
