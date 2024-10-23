import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const NestedEnumConnectionTargetFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTargetFilter> = z.object({
  equals: z.lazy(() => ConnectionTargetSchema).optional(),
  in: z.lazy(() => ConnectionTargetSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTargetSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTargetSchema),z.lazy(() => NestedEnumConnectionTargetFilterSchema) ]).optional(),
}).strict();

export default NestedEnumConnectionTargetFilterSchema;
