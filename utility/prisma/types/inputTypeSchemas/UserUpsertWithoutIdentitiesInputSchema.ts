import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserUpdateWithoutIdentitiesInputSchema } from './UserUpdateWithoutIdentitiesInputSchema';
import { UserUncheckedUpdateWithoutIdentitiesInputSchema } from './UserUncheckedUpdateWithoutIdentitiesInputSchema';
import { UserCreateWithoutIdentitiesInputSchema } from './UserCreateWithoutIdentitiesInputSchema';
import { UserUncheckedCreateWithoutIdentitiesInputSchema } from './UserUncheckedCreateWithoutIdentitiesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpsertWithoutIdentitiesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutIdentitiesInputSchema;
