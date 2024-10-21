import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'
import { IdentityCreateInputSchema } from '../inputTypeSchemas/IdentityCreateInputSchema'
import { IdentityUncheckedCreateInputSchema } from '../inputTypeSchemas/IdentityUncheckedCreateInputSchema'
import { IdentityUpdateInputSchema } from '../inputTypeSchemas/IdentityUpdateInputSchema'
import { IdentityUncheckedUpdateInputSchema } from '../inputTypeSchemas/IdentityUncheckedUpdateInputSchema'

export const IdentityUpsertArgsSchema: z.ZodType<Omit<Prisma.IdentityUpsertArgs, "select" | "include">> = z.object({
  where: IdentityWhereUniqueInputSchema,
  create: z.union([ IdentityCreateInputSchema,IdentityUncheckedCreateInputSchema ]),
  update: z.union([ IdentityUpdateInputSchema,IdentityUncheckedUpdateInputSchema ]),
}).strict() ;

export default IdentityUpsertArgsSchema;
