import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IdentityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IdentityAvgOrderByAggregateInputSchema;
