import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreatepermissionsInputSchema } from './UserCreatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { ConnectionCreateNestedManyWithoutUserInputSchema } from './ConnectionCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateWithoutIdentitiesInput> = z.object({
  name: z.string(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  permissions: z.union([ z.lazy(() => UserCreatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  connections: z.lazy(() => ConnectionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutIdentitiesInputSchema;
