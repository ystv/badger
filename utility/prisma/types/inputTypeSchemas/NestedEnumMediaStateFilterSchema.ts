import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';

export const NestedEnumMediaStateFilterSchema: z.ZodType<Prisma.NestedEnumMediaStateFilter> = z.object({
  equals: z.lazy(() => MediaStateSchema).optional(),
  in: z.lazy(() => MediaStateSchema).array().optional(),
  notIn: z.lazy(() => MediaStateSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaStateSchema),z.lazy(() => NestedEnumMediaStateFilterSchema) ]).optional(),
}).strict();

export default NestedEnumMediaStateFilterSchema;
