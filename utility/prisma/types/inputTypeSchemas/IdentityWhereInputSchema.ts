import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const IdentityWhereInputSchema: z.ZodType<Prisma.IdentityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IdentityWhereInputSchema),z.lazy(() => IdentityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IdentityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IdentityWhereInputSchema),z.lazy(() => IdentityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identityID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default IdentityWhereInputSchema;
