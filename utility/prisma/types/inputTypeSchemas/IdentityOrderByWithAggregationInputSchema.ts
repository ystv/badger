import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { IdentityCountOrderByAggregateInputSchema } from './IdentityCountOrderByAggregateInputSchema';
import { IdentityAvgOrderByAggregateInputSchema } from './IdentityAvgOrderByAggregateInputSchema';
import { IdentityMaxOrderByAggregateInputSchema } from './IdentityMaxOrderByAggregateInputSchema';
import { IdentityMinOrderByAggregateInputSchema } from './IdentityMinOrderByAggregateInputSchema';
import { IdentitySumOrderByAggregateInputSchema } from './IdentitySumOrderByAggregateInputSchema';

export const IdentityOrderByWithAggregationInputSchema: z.ZodType<Prisma.IdentityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  identityID: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IdentityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IdentityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IdentityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IdentityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IdentitySumOrderByAggregateInputSchema).optional()
}).strict();

export default IdentityOrderByWithAggregationInputSchema;
