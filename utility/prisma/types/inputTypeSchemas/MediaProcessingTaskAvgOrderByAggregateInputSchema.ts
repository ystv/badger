import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MediaProcessingTaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  media_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MediaProcessingTaskAvgOrderByAggregateInputSchema;
