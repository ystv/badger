import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumPermissionNullableListFilterSchema } from './EnumPermissionNullableListFilterSchema';
import { IdentityListRelationFilterSchema } from './IdentityListRelationFilterSchema';
import { ConnectionListRelationFilterSchema } from './ConnectionListRelationFilterSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  permissions: z.lazy(() => EnumPermissionNullableListFilterSchema).optional(),
  identities: z.lazy(() => IdentityListRelationFilterSchema).optional(),
  connections: z.lazy(() => ConnectionListRelationFilterSchema).optional()
}).strict();

export default UserWhereInputSchema;
