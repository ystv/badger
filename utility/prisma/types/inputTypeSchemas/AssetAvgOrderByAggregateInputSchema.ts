import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AssetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AssetAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  rundownId: z.lazy(() => SortOrderSchema).optional(),
  mediaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AssetAvgOrderByAggregateInputSchema;
