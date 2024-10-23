import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';
import { NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema } from './NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMediaProcessingTaskStateFilterSchema } from './NestedEnumMediaProcessingTaskStateFilterSchema';

export const EnumMediaProcessingTaskStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MediaProcessingTaskStateSchema).optional(),
  in: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  notIn: z.lazy(() => MediaProcessingTaskStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaProcessingTaskStateSchema),z.lazy(() => NestedEnumMediaProcessingTaskStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMediaProcessingTaskStateFilterSchema).optional()
}).strict();

export default EnumMediaProcessingTaskStateWithAggregatesFilterSchema;
