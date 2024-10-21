import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumConnectionTargetFilterSchema } from './EnumConnectionTargetFilterSchema';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const ConnectionScalarWhereInputSchema: z.ZodType<Prisma.ConnectionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConnectionScalarWhereInputSchema),z.lazy(() => ConnectionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionScalarWhereInputSchema),z.lazy(() => ConnectionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  target: z.union([ z.lazy(() => EnumConnectionTargetFilterSchema),z.lazy(() => ConnectionTargetSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default ConnectionScalarWhereInputSchema;
