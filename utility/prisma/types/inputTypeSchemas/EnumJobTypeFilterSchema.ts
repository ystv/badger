import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobTypeSchema } from './JobTypeSchema';
import { NestedEnumJobTypeFilterSchema } from './NestedEnumJobTypeFilterSchema';

export const EnumJobTypeFilterSchema: z.ZodType<Prisma.EnumJobTypeFilter> = z.object({
  equals: z.lazy(() => JobTypeSchema).optional(),
  in: z.lazy(() => JobTypeSchema).array().optional(),
  notIn: z.lazy(() => JobTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => NestedEnumJobTypeFilterSchema) ]).optional(),
}).strict();

export default EnumJobTypeFilterSchema;
