import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MetadataFieldCountOrderByAggregateInputSchema: z.ZodType<Prisma.MetadataFieldCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MetadataFieldCountOrderByAggregateInputSchema;
