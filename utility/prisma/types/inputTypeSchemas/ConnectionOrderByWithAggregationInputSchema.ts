import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ConnectionCountOrderByAggregateInputSchema } from './ConnectionCountOrderByAggregateInputSchema';
import { ConnectionAvgOrderByAggregateInputSchema } from './ConnectionAvgOrderByAggregateInputSchema';
import { ConnectionMaxOrderByAggregateInputSchema } from './ConnectionMaxOrderByAggregateInputSchema';
import { ConnectionMinOrderByAggregateInputSchema } from './ConnectionMinOrderByAggregateInputSchema';
import { ConnectionSumOrderByAggregateInputSchema } from './ConnectionSumOrderByAggregateInputSchema';

export const ConnectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConnectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConnectionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ConnectionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConnectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConnectionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ConnectionSumOrderByAggregateInputSchema).optional()
}).strict();

export default ConnectionOrderByWithAggregationInputSchema;
