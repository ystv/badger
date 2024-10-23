import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RundownCountOrderByAggregateInputSchema } from './RundownCountOrderByAggregateInputSchema';
import { RundownAvgOrderByAggregateInputSchema } from './RundownAvgOrderByAggregateInputSchema';
import { RundownMaxOrderByAggregateInputSchema } from './RundownMaxOrderByAggregateInputSchema';
import { RundownMinOrderByAggregateInputSchema } from './RundownMinOrderByAggregateInputSchema';
import { RundownSumOrderByAggregateInputSchema } from './RundownSumOrderByAggregateInputSchema';

export const RundownOrderByWithAggregationInputSchema: z.ZodType<Prisma.RundownOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RundownCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RundownAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RundownMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RundownMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RundownSumOrderByAggregateInputSchema).optional()
}).strict();

export default RundownOrderByWithAggregationInputSchema;
