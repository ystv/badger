import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { NestedEnumRundownItemTypeFilterSchema } from './NestedEnumRundownItemTypeFilterSchema';

export const EnumRundownItemTypeFilterSchema: z.ZodType<Prisma.EnumRundownItemTypeFilter> = z.object({
  equals: z.lazy(() => RundownItemTypeSchema).optional(),
  in: z.lazy(() => RundownItemTypeSchema).array().optional(),
  notIn: z.lazy(() => RundownItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => NestedEnumRundownItemTypeFilterSchema) ]).optional(),
}).strict();

export default EnumRundownItemTypeFilterSchema;
