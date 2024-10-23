import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'

export const UserDeleteArgsSchema: z.ZodType<Omit<Prisma.UserDeleteArgs, "select" | "include">> = z.object({
  where: UserWhereUniqueInputSchema,
}).strict() ;

export default UserDeleteArgsSchema;
