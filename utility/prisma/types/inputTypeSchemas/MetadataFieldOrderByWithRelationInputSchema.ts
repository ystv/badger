import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MetadataOrderByRelationAggregateInputSchema } from './MetadataOrderByRelationAggregateInputSchema';

export const MetadataFieldOrderByWithRelationInputSchema: z.ZodType<Prisma.MetadataFieldOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  default: z.lazy(() => SortOrderSchema).optional(),
  values: z.lazy(() => MetadataOrderByRelationAggregateInputSchema).optional()
}).strict();

export default MetadataFieldOrderByWithRelationInputSchema;
