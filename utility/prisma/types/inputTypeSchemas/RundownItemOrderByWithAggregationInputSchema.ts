import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RundownItemCountOrderByAggregateInputSchema } from './RundownItemCountOrderByAggregateInputSchema';
import { RundownItemAvgOrderByAggregateInputSchema } from './RundownItemAvgOrderByAggregateInputSchema';
import { RundownItemMaxOrderByAggregateInputSchema } from './RundownItemMaxOrderByAggregateInputSchema';
import { RundownItemMinOrderByAggregateInputSchema } from './RundownItemMinOrderByAggregateInputSchema';
import { RundownItemSumOrderByAggregateInputSchema } from './RundownItemSumOrderByAggregateInputSchema';

export const RundownItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.RundownItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rundownId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RundownItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RundownItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RundownItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RundownItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RundownItemSumOrderByAggregateInputSchema).optional()
}).strict();

export default RundownItemOrderByWithAggregationInputSchema;
