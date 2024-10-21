import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MetadataFieldCountOrderByAggregateInputSchema } from './MetadataFieldCountOrderByAggregateInputSchema';
import { MetadataFieldAvgOrderByAggregateInputSchema } from './MetadataFieldAvgOrderByAggregateInputSchema';
import { MetadataFieldMaxOrderByAggregateInputSchema } from './MetadataFieldMaxOrderByAggregateInputSchema';
import { MetadataFieldMinOrderByAggregateInputSchema } from './MetadataFieldMinOrderByAggregateInputSchema';
import { MetadataFieldSumOrderByAggregateInputSchema } from './MetadataFieldSumOrderByAggregateInputSchema';

export const MetadataFieldOrderByWithAggregationInputSchema: z.ZodType<Prisma.MetadataFieldOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  default: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MetadataFieldCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MetadataFieldAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MetadataFieldMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MetadataFieldMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MetadataFieldSumOrderByAggregateInputSchema).optional()
}).strict();

export default MetadataFieldOrderByWithAggregationInputSchema;
