import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { NestedEnumMediaStateFilterSchema } from './NestedEnumMediaStateFilterSchema';

export const EnumMediaStateFilterSchema: z.ZodType<Prisma.EnumMediaStateFilter> = z.object({
  equals: z.lazy(() => MediaStateSchema).optional(),
  in: z.lazy(() => MediaStateSchema).array().optional(),
  notIn: z.lazy(() => MediaStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaStateSchema),z.lazy(() => NestedEnumMediaStateFilterSchema) ]).optional(),
}).strict();

export default EnumMediaStateFilterSchema;
