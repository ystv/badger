import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumMediaProcessingTaskStateWithAggregatesFilterSchema } from './EnumMediaProcessingTaskStateWithAggregatesFilterSchema';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaProcessingTaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaProcessingTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  media_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  additionalInfo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => EnumMediaProcessingTaskStateWithAggregatesFilterSchema),z.lazy(() => MediaProcessingTaskStateSchema) ]).optional(),
}).strict();

export default MediaProcessingTaskScalarWhereWithAggregatesInputSchema;
