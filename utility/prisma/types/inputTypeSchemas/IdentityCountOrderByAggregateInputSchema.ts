import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IdentityCountOrderByAggregateInputSchema: z.ZodType<Prisma.IdentityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  identityID: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IdentityCountOrderByAggregateInputSchema;
