import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityProviderIdentityIDCompoundUniqueInputSchema } from './IdentityProviderIdentityIDCompoundUniqueInputSchema';
import { IdentityWhereInputSchema } from './IdentityWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const IdentityWhereUniqueInputSchema: z.ZodType<Prisma.IdentityWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    provider_identityID: z.lazy(() => IdentityProviderIdentityIDCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    provider_identityID: z.lazy(() => IdentityProviderIdentityIDCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  provider_identityID: z.lazy(() => IdentityProviderIdentityIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => IdentityWhereInputSchema),z.lazy(() => IdentityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IdentityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IdentityWhereInputSchema),z.lazy(() => IdentityWhereInputSchema).array() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identityID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userID: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default IdentityWhereUniqueInputSchema;
