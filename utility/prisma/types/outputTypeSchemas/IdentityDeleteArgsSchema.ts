import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'

export const IdentityDeleteArgsSchema: z.ZodType<Omit<Prisma.IdentityDeleteArgs, "select" | "include">> = z.object({
  where: IdentityWhereUniqueInputSchema,
}).strict() ;

export default IdentityDeleteArgsSchema;
