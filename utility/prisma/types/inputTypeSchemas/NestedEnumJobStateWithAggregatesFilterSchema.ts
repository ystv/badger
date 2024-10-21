import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobStateSchema } from './JobStateSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumJobStateFilterSchema } from './NestedEnumJobStateFilterSchema';

export const NestedEnumJobStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobStateSchema).optional(),
  in: z.lazy(() => JobStateSchema).array().optional(),
  notIn: z.lazy(() => JobStateSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStateSchema),z.lazy(() => NestedEnumJobStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobStateFilterSchema).optional()
}).strict();

export default NestedEnumJobStateWithAggregatesFilterSchema;
