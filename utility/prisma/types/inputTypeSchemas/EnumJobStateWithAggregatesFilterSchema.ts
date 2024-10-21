import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobStateSchema } from './JobStateSchema';
import { NestedEnumJobStateWithAggregatesFilterSchema } from './NestedEnumJobStateWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumJobStateFilterSchema } from './NestedEnumJobStateFilterSchema';

export const EnumJobStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobStateSchema).optional(),
  in: z.lazy(() => JobStateSchema).array().optional(),
  notIn: z.lazy(() => JobStateSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStateSchema),z.lazy(() => NestedEnumJobStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStateFilterSchema).optional()
}).strict();

export default EnumJobStateWithAggregatesFilterSchema;
