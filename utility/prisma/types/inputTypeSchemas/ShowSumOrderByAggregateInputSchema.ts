import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ShowSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ShowSumOrderByAggregateInputSchema;
