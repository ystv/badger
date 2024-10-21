import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreatepermissionsInputSchema } from './UserCreatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { ConnectionUncheckedCreateNestedManyWithoutUserInputSchema } from './ConnectionUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIdentitiesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  permissions: z.union([ z.lazy(() => UserCreatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  connections: z.lazy(() => ConnectionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutIdentitiesInputSchema;
