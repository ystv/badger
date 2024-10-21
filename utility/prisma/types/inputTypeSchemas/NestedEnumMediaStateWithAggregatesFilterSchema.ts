import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMediaStateFilterSchema } from './NestedEnumMediaStateFilterSchema';

export const NestedEnumMediaStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMediaStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MediaStateSchema).optional(),
  in: z.lazy(() => MediaStateSchema).array().optional(),
  notIn: z.lazy(() => MediaStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaStateSchema),z.lazy(() => NestedEnumMediaStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMediaStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMediaStateFilterSchema).optional()
}).strict();

export default NestedEnumMediaStateWithAggregatesFilterSchema;
