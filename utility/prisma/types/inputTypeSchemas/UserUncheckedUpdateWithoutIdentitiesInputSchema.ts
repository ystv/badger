import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { UserUpdatepermissionsInputSchema } from './UserUpdatepermissionsInputSchema';
import { PermissionSchema } from './PermissionSchema';
import { ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema } from './ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema';

export const UserUncheckedUpdateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIdentitiesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.union([ z.lazy(() => UserUpdatepermissionsInputSchema),z.lazy(() => PermissionSchema).array() ]).optional(),
  connections: z.lazy(() => ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUncheckedUpdateWithoutIdentitiesInputSchema;
