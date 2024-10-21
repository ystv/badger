import type { Prisma } from '../../client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';

export const BaseJobOrderByWithRelationInputSchema: z.ZodType<Prisma.BaseJobOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  completedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  manuallyTriggered: z.lazy(() => SortOrderSchema).optional(),
  externalJobProvider: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  externalJobID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  jobPayload: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BaseJobOrderByWithRelationInputSchema;
