import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RundownMinOrderByAggregateInputSchema: z.ZodType<Prisma.RundownMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  ytBroadcastID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RundownMinOrderByAggregateInputSchema;
