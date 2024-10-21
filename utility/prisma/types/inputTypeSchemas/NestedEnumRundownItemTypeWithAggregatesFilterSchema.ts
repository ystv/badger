import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumRundownItemTypeFilterSchema } from './NestedEnumRundownItemTypeFilterSchema';

export const NestedEnumRundownItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRundownItemTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RundownItemTypeSchema).optional(),
  in: z.lazy(() => RundownItemTypeSchema).array().optional(),
  notIn: z.lazy(() => RundownItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => NestedEnumRundownItemTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRundownItemTypeFilterSchema).optional()
}).strict();

export default NestedEnumRundownItemTypeWithAggregatesFilterSchema;
