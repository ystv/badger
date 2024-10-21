import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreateWithoutConnectionsInputSchema } from './UserCreateWithoutConnectionsInputSchema';
import { UserUncheckedCreateWithoutConnectionsInputSchema } from './UserUncheckedCreateWithoutConnectionsInputSchema';
import { UserCreateOrConnectWithoutConnectionsInputSchema } from './UserCreateOrConnectWithoutConnectionsInputSchema';
import { UserUpsertWithoutConnectionsInputSchema } from './UserUpsertWithoutConnectionsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutConnectionsInputSchema } from './UserUpdateToOneWithWhereWithoutConnectionsInputSchema';
import { UserUpdateWithoutConnectionsInputSchema } from './UserUpdateWithoutConnectionsInputSchema';
import { UserUncheckedUpdateWithoutConnectionsInputSchema } from './UserUncheckedUpdateWithoutConnectionsInputSchema';

export const UserUpdateOneRequiredWithoutConnectionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConnectionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConnectionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConnectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutConnectionsInputSchema),z.lazy(() => UserUpdateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutConnectionsNestedInputSchema;
