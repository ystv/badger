import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MediaProcessingTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaProcessingTaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  media_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  additionalInfo: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MediaProcessingTaskMinOrderByAggregateInputSchema;
