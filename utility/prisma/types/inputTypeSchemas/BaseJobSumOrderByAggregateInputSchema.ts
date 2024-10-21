import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BaseJobSumOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BaseJobSumOrderByAggregateInputSchema;
