import type { Prisma } from '../../client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutConnectionsInputSchema } from './UserUpdateWithoutConnectionsInputSchema';
import { UserUncheckedUpdateWithoutConnectionsInputSchema } from './UserUncheckedUpdateWithoutConnectionsInputSchema';

export const UserUpdateToOneWithWhereWithoutConnectionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConnectionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutConnectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConnectionsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutConnectionsInputSchema;
