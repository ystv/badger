import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ShowOrderByWithRelationInputSchema } from './ShowOrderByWithRelationInputSchema';
import { RundownItemOrderByRelationAggregateInputSchema } from './RundownItemOrderByRelationAggregateInputSchema';
import { AssetOrderByRelationAggregateInputSchema } from './AssetOrderByRelationAggregateInputSchema';
import { MetadataOrderByRelationAggregateInputSchema } from './MetadataOrderByRelationAggregateInputSchema';

export const RundownOrderByWithRelationInputSchema: z.ZodType<Prisma.RundownOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  showId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  ytBroadcastID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  show: z.lazy(() => ShowOrderByWithRelationInputSchema).optional(),
  items: z.lazy(() => RundownItemOrderByRelationAggregateInputSchema).optional(),
  assets: z.lazy(() => AssetOrderByRelationAggregateInputSchema).optional(),
  metadata: z.lazy(() => MetadataOrderByRelationAggregateInputSchema).optional()
}).strict();

export default RundownOrderByWithRelationInputSchema;
