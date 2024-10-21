import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BaseJobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BaseJobAvgOrderByAggregateInputSchema;
