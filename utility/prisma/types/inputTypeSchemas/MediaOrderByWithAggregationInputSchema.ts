import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MediaCountOrderByAggregateInputSchema } from './MediaCountOrderByAggregateInputSchema';
import { MediaAvgOrderByAggregateInputSchema } from './MediaAvgOrderByAggregateInputSchema';
import { MediaMaxOrderByAggregateInputSchema } from './MediaMaxOrderByAggregateInputSchema';
import { MediaMinOrderByAggregateInputSchema } from './MediaMinOrderByAggregateInputSchema';
import { MediaSumOrderByAggregateInputSchema } from './MediaSumOrderByAggregateInputSchema';

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rawPath: z.lazy(() => SortOrderSchema).optional(),
  path: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MediaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MediaSumOrderByAggregateInputSchema).optional()
}).strict();

export default MediaOrderByWithAggregationInputSchema;
