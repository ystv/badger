import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutIdentitiesInputSchema } from './UserUpdateWithoutIdentitiesInputSchema';
import { UserUncheckedUpdateWithoutIdentitiesInputSchema } from './UserUncheckedUpdateWithoutIdentitiesInputSchema';

export const UserUpdateToOneWithWhereWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIdentitiesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIdentitiesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIdentitiesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutIdentitiesInputSchema;
