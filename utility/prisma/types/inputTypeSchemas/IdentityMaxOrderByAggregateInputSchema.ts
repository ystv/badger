import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IdentityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  identityID: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IdentityMaxOrderByAggregateInputSchema;
