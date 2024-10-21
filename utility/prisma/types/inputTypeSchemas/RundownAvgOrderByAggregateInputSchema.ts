import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RundownAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RundownAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RundownAvgOrderByAggregateInputSchema;
