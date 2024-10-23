import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';

export const NestedEnumRundownItemTypeFilterSchema: z.ZodType<Prisma.NestedEnumRundownItemTypeFilter> = z.object({
  equals: z.lazy(() => RundownItemTypeSchema).optional(),
  in: z.lazy(() => RundownItemTypeSchema).array().optional(),
  notIn: z.lazy(() => RundownItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => NestedEnumRundownItemTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumRundownItemTypeFilterSchema;
