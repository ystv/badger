import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreatepermissionsInputSchema } from './UserCreatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { IdentityCreateNestedManyWithoutUserInputSchema } from './IdentityCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateWithoutConnectionsInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  permissions: z.union([ z.lazy(() => UserCreatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  identities: z.lazy(() => IdentityCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutConnectionsInputSchema;
