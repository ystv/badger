import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'

export const IdentityFindUniqueArgsSchema: z.ZodType<Omit<Prisma.IdentityFindUniqueArgs, "select" | "include">> = z.object({
  where: IdentityWhereUniqueInputSchema,
}).strict() ;

export default IdentityFindUniqueArgsSchema;
