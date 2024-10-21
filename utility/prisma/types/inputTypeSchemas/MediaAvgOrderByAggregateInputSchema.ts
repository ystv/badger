import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MediaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MediaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  durationSeconds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MediaAvgOrderByAggregateInputSchema;
