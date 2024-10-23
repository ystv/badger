import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { EnumConnectionTargetWithAggregatesFilterSchema } from './EnumConnectionTargetWithAggregatesFilterSchema';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const ConnectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConnectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConnectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  target: z.union([ z.lazy(() => EnumConnectionTargetWithAggregatesFilterSchema),z.lazy(() => ConnectionTargetSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default ConnectionScalarWhereWithAggregatesInputSchema;
