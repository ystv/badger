import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutIdentitiesInputSchema } from './UserCreateWithoutIdentitiesInputSchema';
import { UserUncheckedCreateWithoutIdentitiesInputSchema } from './UserUncheckedCreateWithoutIdentitiesInputSchema';

export const UserCreateOrConnectWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIdentitiesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutIdentitiesInputSchema;
