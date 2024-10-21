import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const IdentityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IdentityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default IdentityOrderByRelationAggregateInputSchema;
