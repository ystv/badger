import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ShowCountOrderByAggregateInputSchema } from './ShowCountOrderByAggregateInputSchema';
import { ShowAvgOrderByAggregateInputSchema } from './ShowAvgOrderByAggregateInputSchema';
import { ShowMaxOrderByAggregateInputSchema } from './ShowMaxOrderByAggregateInputSchema';
import { ShowMinOrderByAggregateInputSchema } from './ShowMinOrderByAggregateInputSchema';
import { ShowSumOrderByAggregateInputSchema } from './ShowSumOrderByAggregateInputSchema';

export const ShowOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  start: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  ytStreamID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ShowCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShowAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShowMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShowSumOrderByAggregateInputSchema).optional()
}).strict();

export default ShowOrderByWithAggregationInputSchema;
