import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RundownItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RundownItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RundownItemOrderByRelationAggregateInputSchema;
