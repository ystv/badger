import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityUpdateInputSchema } from '../inputTypeSchemas/IdentityUpdateInputSchema'
import { IdentityUncheckedUpdateInputSchema } from '../inputTypeSchemas/IdentityUncheckedUpdateInputSchema'
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'

export const IdentityUpdateArgsSchema: z.ZodType<Omit<Prisma.IdentityUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ IdentityUpdateInputSchema,IdentityUncheckedUpdateInputSchema ]),
  where: IdentityWhereUniqueInputSchema,
}).strict() ;

export default IdentityUpdateArgsSchema;
