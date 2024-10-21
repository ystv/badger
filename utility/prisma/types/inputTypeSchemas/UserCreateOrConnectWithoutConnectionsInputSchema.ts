import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutConnectionsInputSchema } from './UserCreateWithoutConnectionsInputSchema';
import { UserUncheckedCreateWithoutConnectionsInputSchema } from './UserUncheckedCreateWithoutConnectionsInputSchema';

export const UserCreateOrConnectWithoutConnectionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConnectionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConnectionsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutConnectionsInputSchema;
