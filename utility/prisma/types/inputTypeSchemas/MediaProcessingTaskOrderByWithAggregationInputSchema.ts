import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MediaProcessingTaskCountOrderByAggregateInputSchema } from './MediaProcessingTaskCountOrderByAggregateInputSchema';
import { MediaProcessingTaskAvgOrderByAggregateInputSchema } from './MediaProcessingTaskAvgOrderByAggregateInputSchema';
import { MediaProcessingTaskMaxOrderByAggregateInputSchema } from './MediaProcessingTaskMaxOrderByAggregateInputSchema';
import { MediaProcessingTaskMinOrderByAggregateInputSchema } from './MediaProcessingTaskMinOrderByAggregateInputSchema';
import { MediaProcessingTaskSumOrderByAggregateInputSchema } from './MediaProcessingTaskSumOrderByAggregateInputSchema';

export const MediaProcessingTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaProcessingTaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  media_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  additionalInfo: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MediaProcessingTaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MediaProcessingTaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaProcessingTaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaProcessingTaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MediaProcessingTaskSumOrderByAggregateInputSchema).optional()
}).strict();

export default MediaProcessingTaskOrderByWithAggregationInputSchema;
