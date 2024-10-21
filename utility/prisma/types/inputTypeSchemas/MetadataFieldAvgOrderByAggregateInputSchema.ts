import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MetadataFieldAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MetadataFieldAvgOrderByAggregateInputSchema;
