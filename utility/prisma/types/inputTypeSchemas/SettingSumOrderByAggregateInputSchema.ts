import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SettingSumOrderByAggregateInputSchema: z.ZodType<Prisma.SettingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SettingSumOrderByAggregateInputSchema;
