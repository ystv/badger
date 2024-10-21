import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MediaProcessingTaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MediaProcessingTaskOrderByRelationAggregateInputSchema;
