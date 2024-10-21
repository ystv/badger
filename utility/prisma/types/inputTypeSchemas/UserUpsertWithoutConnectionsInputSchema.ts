import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserUpdateWithoutConnectionsInputSchema } from './UserUpdateWithoutConnectionsInputSchema';
import { UserUncheckedUpdateWithoutConnectionsInputSchema } from './UserUncheckedUpdateWithoutConnectionsInputSchema';
import { UserCreateWithoutConnectionsInputSchema } from './UserCreateWithoutConnectionsInputSchema';
import { UserUncheckedCreateWithoutConnectionsInputSchema } from './UserUncheckedCreateWithoutConnectionsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutConnectionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutConnectionsInputSchema;
