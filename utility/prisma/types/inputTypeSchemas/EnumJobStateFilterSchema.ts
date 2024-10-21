import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobStateSchema } from './JobStateSchema';
import { NestedEnumJobStateFilterSchema } from './NestedEnumJobStateFilterSchema';

export const EnumJobStateFilterSchema: z.ZodType<Prisma.EnumJobStateFilter> = z.object({
  equals: z.lazy(() => JobStateSchema).optional(),
  in: z.lazy(() => JobStateSchema).array().optional(),
  notIn: z.lazy(() => JobStateSchema).array().optional(),
  not: z.union([ z.lazy(() => JobStateSchema),z.lazy(() => NestedEnumJobStateFilterSchema) ]).optional(),
}).strict();

export default EnumJobStateFilterSchema;
