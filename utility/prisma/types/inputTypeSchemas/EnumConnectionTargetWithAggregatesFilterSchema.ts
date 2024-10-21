import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { NestedEnumConnectionTargetWithAggregatesFilterSchema } from './NestedEnumConnectionTargetWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumConnectionTargetFilterSchema } from './NestedEnumConnectionTargetFilterSchema';

export const EnumConnectionTargetWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConnectionTargetWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionTargetSchema).optional(),
  in: z.lazy(() => ConnectionTargetSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTargetSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTargetSchema),z.lazy(() => NestedEnumConnectionTargetWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional()
}).strict();

export default EnumConnectionTargetWithAggregatesFilterSchema;
