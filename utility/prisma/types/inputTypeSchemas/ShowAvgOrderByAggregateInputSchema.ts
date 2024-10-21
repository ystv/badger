import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ShowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShowAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ShowAvgOrderByAggregateInputSchema;
