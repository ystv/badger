import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';
import { NestedEnumMediaProcessingTaskStateFilterSchema } from './NestedEnumMediaProcessingTaskStateFilterSchema';

export const EnumMediaProcessingTaskStateFilterSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateFilter> = z.object({
  equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
  in: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  notIn: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaProcessingTaskStateSchema),z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema) ]).optional(),
}).strict();

export default EnumMediaProcessingTaskStateFilterSchema;
