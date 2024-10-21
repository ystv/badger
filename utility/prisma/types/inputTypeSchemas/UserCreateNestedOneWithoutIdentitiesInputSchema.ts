import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreateWithoutIdentitiesInputSchema } from './UserCreateWithoutIdentitiesInputSchema';
import { UserUncheckedCreateWithoutIdentitiesInputSchema } from './UserUncheckedCreateWithoutIdentitiesInputSchema';
import { UserCreateOrConnectWithoutIdentitiesInputSchema } from './UserCreateOrConnectWithoutIdentitiesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIdentitiesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutIdentitiesInputSchema;
