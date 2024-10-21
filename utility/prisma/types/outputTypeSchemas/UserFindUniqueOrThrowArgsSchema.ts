import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.UserFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: UserWhereUniqueInputSchema,
}).strict() ;

export default UserFindUniqueOrThrowArgsSchema;
