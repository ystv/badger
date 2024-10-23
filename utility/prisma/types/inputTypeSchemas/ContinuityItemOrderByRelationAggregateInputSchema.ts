import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ContinuityItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContinuityItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ContinuityItemOrderByRelationAggregateInputSchema;
