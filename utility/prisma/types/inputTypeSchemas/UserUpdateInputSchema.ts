import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { UserUpdatepermissionsInputSchema } from './UserUpdatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { IdentityUpdateManyWithoutUserNestedInputSchema } from './IdentityUpdateManyWithoutUserNestedInputSchema';
import { ConnectionUpdateManyWithoutUserNestedInputSchema } from './ConnectionUpdateManyWithoutUserNestedInputSchema';

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.union([ z.lazy(() => UserUpdatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  identities: z.lazy(() => IdentityUpdateManyWithoutUserNestedInputSchema).optional(),
  connections: z.lazy(() => ConnectionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUpdateInputSchema;
