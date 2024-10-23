import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'

export const IdentityFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.IdentityFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: IdentityWhereUniqueInputSchema,
}).strict() ;

export default IdentityFindUniqueOrThrowArgsSchema;
