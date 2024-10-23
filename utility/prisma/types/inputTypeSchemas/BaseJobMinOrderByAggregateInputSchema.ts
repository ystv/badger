import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BaseJobMinOrderByAggregateInputSchema: z.ZodType<Prisma.BaseJobMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
  externalJobProvider: z.lazy(() => SortOrderSchema).optional(),
  externalJobID: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BaseJobMinOrderByAggregateInputSchema;
