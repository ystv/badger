import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MetadataCountOrderByAggregateInputSchema } from './MetadataCountOrderByAggregateInputSchema';
import { MetadataAvgOrderByAggregateInputSchema } from './MetadataAvgOrderByAggregateInputSchema';
import { MetadataMaxOrderByAggregateInputSchema } from './MetadataMaxOrderByAggregateInputSchema';
import { MetadataMinOrderByAggregateInputSchema } from './MetadataMinOrderByAggregateInputSchema';
import { MetadataSumOrderByAggregateInputSchema } from './MetadataSumOrderByAggregateInputSchema';

export const MetadataOrderByWithAggregationInputSchema: z.ZodType<Prisma.MetadataOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  fieldId: z.lazy(() => SortOrderSchema).optional(),
  showId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rundownId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mediaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MetadataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MetadataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MetadataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MetadataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MetadataSumOrderByAggregateInputSchema).optional()
}).strict();

export default MetadataOrderByWithAggregationInputSchema;
