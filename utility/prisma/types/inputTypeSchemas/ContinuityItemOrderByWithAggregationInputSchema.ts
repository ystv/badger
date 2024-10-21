import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ContinuityItemCountOrderByAggregateInputSchema } from './ContinuityItemCountOrderByAggregateInputSchema';
import { ContinuityItemAvgOrderByAggregateInputSchema } from './ContinuityItemAvgOrderByAggregateInputSchema';
import { ContinuityItemMaxOrderByAggregateInputSchema } from './ContinuityItemMaxOrderByAggregateInputSchema';
import { ContinuityItemMinOrderByAggregateInputSchema } from './ContinuityItemMinOrderByAggregateInputSchema';
import { ContinuityItemSumOrderByAggregateInputSchema } from './ContinuityItemSumOrderByAggregateInputSchema';

export const ContinuityItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContinuityItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ContinuityItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ContinuityItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContinuityItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContinuityItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ContinuityItemSumOrderByAggregateInputSchema).optional()
}).strict();

export default ContinuityItemOrderByWithAggregationInputSchema;
