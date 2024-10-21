import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserCreateInputSchema } from '../inputTypeSchemas/UserCreateInputSchema'
import { UserUncheckedCreateInputSchema } from '../inputTypeSchemas/UserUncheckedCreateInputSchema'

export const UserCreateArgsSchema: z.ZodType<Omit<Prisma.UserCreateArgs, "select" | "include">> = z.object({
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export default UserCreateArgsSchema;
