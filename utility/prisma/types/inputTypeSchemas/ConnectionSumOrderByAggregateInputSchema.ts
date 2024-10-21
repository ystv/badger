import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ConnectionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ConnectionSumOrderByAggregateInputSchema;
