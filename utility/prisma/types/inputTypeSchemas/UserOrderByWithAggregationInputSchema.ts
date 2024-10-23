import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserCountOrderByAggregateInputSchema } from './UserCountOrderByAggregateInputSchema';
import { UserAvgOrderByAggregateInputSchema } from './UserAvgOrderByAggregateInputSchema';
import { UserMaxOrderByAggregateInputSchema } from './UserMaxOrderByAggregateInputSchema';
import { UserMinOrderByAggregateInputSchema } from './UserMinOrderByAggregateInputSchema';
import { UserSumOrderByAggregateInputSchema } from './UserSumOrderByAggregateInputSchema';

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithAggregationInputSchema;
