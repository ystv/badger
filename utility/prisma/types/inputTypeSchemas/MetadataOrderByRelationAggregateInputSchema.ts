import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MetadataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MetadataOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MetadataOrderByRelationAggregateInputSchema;
