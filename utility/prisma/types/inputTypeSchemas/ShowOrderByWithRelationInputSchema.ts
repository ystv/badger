import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RundownOrderByRelationAggregateInputSchema } from './RundownOrderByRelationAggregateInputSchema';
import { ContinuityItemOrderByRelationAggregateInputSchema } from './ContinuityItemOrderByRelationAggregateInputSchema';
import { MetadataOrderByRelationAggregateInputSchema } from './MetadataOrderByRelationAggregateInputSchema';

export const ShowOrderByWithRelationInputSchema: z.ZodType<Prisma.ShowOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  start: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  ytStreamID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rundowns: z.lazy(() => RundownOrderByRelationAggregateInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemOrderByRelationAggregateInputSchema).optional(),
  metadata: z.lazy(() => MetadataOrderByRelationAggregateInputSchema).optional()
}).strict();

export default ShowOrderByWithRelationInputSchema;
