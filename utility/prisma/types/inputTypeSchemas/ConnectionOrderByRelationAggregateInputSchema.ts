import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ConnectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConnectionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ConnectionOrderByRelationAggregateInputSchema;
