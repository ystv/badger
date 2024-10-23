import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const NestedEnumMediaProcessingTaskStateFilterSchema: z.ZodType<Prisma.NestedEnumMediaProcessingTaskStateFilter> = z.object({
  equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
  in: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  notIn: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaProcessingTaskStateSchema),z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema) ]).optional(),
}).strict();

export default NestedEnumMediaProcessingTaskStateFilterSchema;
