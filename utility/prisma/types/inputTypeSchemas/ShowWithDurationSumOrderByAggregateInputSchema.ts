import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ShowWithDurationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShowWithDurationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ShowWithDurationSumOrderByAggregateInputSchema;
