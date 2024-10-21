import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { NestedEnumConnectionTargetFilterSchema } from './NestedEnumConnectionTargetFilterSchema';

export const EnumConnectionTargetFilterSchema: z.ZodType<Prisma.EnumConnectionTargetFilter> = z.object({
  equals: z.lazy(() => ConnectionTargetSchema).optional(),
  in: z.lazy(() => ConnectionTargetSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTargetSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTargetSchema),z.lazy(() => NestedEnumConnectionTargetFilterSchema) ]).optional(),
}).strict();

export default EnumConnectionTargetFilterSchema;
