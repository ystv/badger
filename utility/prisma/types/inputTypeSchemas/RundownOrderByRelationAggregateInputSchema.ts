import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RundownOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RundownOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RundownOrderByRelationAggregateInputSchema;
