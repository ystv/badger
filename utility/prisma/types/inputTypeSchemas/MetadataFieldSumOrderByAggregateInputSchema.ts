import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MetadataFieldSumOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MetadataFieldSumOrderByAggregateInputSchema;
