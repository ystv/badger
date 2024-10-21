import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserCreateWithoutIdentitiesInputSchema } from './UserCreateWithoutIdentitiesInputSchema';
import { UserUncheckedCreateWithoutIdentitiesInputSchema } from './UserUncheckedCreateWithoutIdentitiesInputSchema';
import { UserCreateOrConnectWithoutIdentitiesInputSchema } from './UserCreateOrConnectWithoutIdentitiesInputSchema';
import { UserUpsertWithoutIdentitiesInputSchema } from './UserUpsertWithoutIdentitiesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutIdentitiesInputSchema } from './UserUpdateToOneWithWhereWithoutIdentitiesInputSchema';
import { UserUpdateWithoutIdentitiesInputSchema } from './UserUpdateWithoutIdentitiesInputSchema';
import { UserUncheckedUpdateWithoutIdentitiesInputSchema } from './UserUncheckedUpdateWithoutIdentitiesInputSchema';

export const UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIdentitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIdentitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIdentitiesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIdentitiesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIdentitiesInputSchema),z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutIdentitiesNestedInputSchema;
