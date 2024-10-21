import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ShowWithDurationCountOrderByAggregateInputSchema } from './ShowWithDurationCountOrderByAggregateInputSchema';
import { ShowWithDurationAvgOrderByAggregateInputSchema } from './ShowWithDurationAvgOrderByAggregateInputSchema';
import { ShowWithDurationMaxOrderByAggregateInputSchema } from './ShowWithDurationMaxOrderByAggregateInputSchema';
import { ShowWithDurationMinOrderByAggregateInputSchema } from './ShowWithDurationMinOrderByAggregateInputSchema';
import { ShowWithDurationSumOrderByAggregateInputSchema } from './ShowWithDurationSumOrderByAggregateInputSchema';

export const ShowWithDurationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowWithDurationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  start: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  end: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  ytStreamID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ShowWithDurationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShowWithDurationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShowWithDurationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShowWithDurationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShowWithDurationSumOrderByAggregateInputSchema).optional()
}).strict();

export default ShowWithDurationOrderByWithAggregationInputSchema;
