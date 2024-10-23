import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreatepermissionsInputSchema } from './UserCreatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { IdentityUncheckedCreateNestedManyWithoutUserInputSchema } from './IdentityUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConnectionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  permissions: z.union([ z.lazy(() => UserCreatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  identities: z.lazy(() => IdentityUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutConnectionsInputSchema;
