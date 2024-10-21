import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AssetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AssetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default AssetOrderByRelationAggregateInputSchema;
