import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreateWithoutConnectionsInputSchema } from './UserCreateWithoutConnectionsInputSchema';
import { UserUncheckedCreateWithoutConnectionsInputSchema } from './UserUncheckedCreateWithoutConnectionsInputSchema';
import { UserCreateOrConnectWithoutConnectionsInputSchema } from './UserCreateOrConnectWithoutConnectionsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConnectionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConnectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutConnectionsInputSchema;
