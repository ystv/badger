import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { AssetCountOrderByAggregateInputSchema } from './AssetCountOrderByAggregateInputSchema';
import { AssetAvgOrderByAggregateInputSchema } from './AssetAvgOrderByAggregateInputSchema';
import { AssetMaxOrderByAggregateInputSchema } from './AssetMaxOrderByAggregateInputSchema';
import { AssetMinOrderByAggregateInputSchema } from './AssetMinOrderByAggregateInputSchema';
import { AssetSumOrderByAggregateInputSchema } from './AssetSumOrderByAggregateInputSchema';

export const AssetOrderByWithAggregationInputSchema: z.ZodType<Prisma.AssetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  rundownId: z.lazy(() => SortOrderSchema).optional(),
  mediaId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AssetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AssetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AssetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AssetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AssetSumOrderByAggregateInputSchema).optional()
}).strict();

export default AssetOrderByWithAggregationInputSchema;
