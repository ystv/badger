import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const IdentityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IdentityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema),z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema),z.lazy(() => IdentityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identityID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userID: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export default IdentityScalarWhereWithAggregatesInputSchema;
