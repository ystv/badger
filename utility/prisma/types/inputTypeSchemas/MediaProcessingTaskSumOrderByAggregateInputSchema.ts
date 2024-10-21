import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MediaProcessingTaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  media_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MediaProcessingTaskSumOrderByAggregateInputSchema;
