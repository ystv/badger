import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RundownItemOrderByRelationAggregateInputSchema } from './RundownItemOrderByRelationAggregateInputSchema';
import { ContinuityItemOrderByRelationAggregateInputSchema } from './ContinuityItemOrderByRelationAggregateInputSchema';
import { MediaProcessingTaskOrderByRelationAggregateInputSchema } from './MediaProcessingTaskOrderByRelationAggregateInputSchema';
import { AssetOrderByRelationAggregateInputSchema } from './AssetOrderByRelationAggregateInputSchema';
import { MetadataOrderByRelationAggregateInputSchema } from './MetadataOrderByRelationAggregateInputSchema';

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rawPath: z.lazy(() => SortOrderSchema).optional(),
  path: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  rundownItems: z.lazy(() => RundownItemOrderByRelationAggregateInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskOrderByRelationAggregateInputSchema).optional(),
  assets: z.lazy(() => AssetOrderByRelationAggregateInputSchema).optional(),
  metadata: z.lazy(() => MetadataOrderByRelationAggregateInputSchema).optional()
}).strict();

export default MediaOrderByWithRelationInputSchema;
