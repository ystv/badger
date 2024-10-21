import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreatepermissionsInputSchema } from './UserCreatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { IdentityCreateNestedManyWithoutUserInputSchema } from './IdentityCreateNestedManyWithoutUserInputSchema';
import { ConnectionCreateNestedManyWithoutUserInputSchema } from './ConnectionCreateNestedManyWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  permissions: z.union([ z.lazy(() => UserCreatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  identities: z.lazy(() => IdentityCreateNestedManyWithoutUserInputSchema).optional(),
  connections: z.lazy(() => ConnectionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateInputSchema;
