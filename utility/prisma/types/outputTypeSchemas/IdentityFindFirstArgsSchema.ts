import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereInputSchema } from '../inputTypeSchemas/IdentityWhereInputSchema'
import { IdentityOrderByWithRelationInputSchema } from '../inputTypeSchemas/IdentityOrderByWithRelationInputSchema'
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'
import { IdentityScalarFieldEnumSchema } from '../inputTypeSchemas/IdentityScalarFieldEnumSchema'

export const IdentityFindFirstArgsSchema: z.ZodType<Omit<Prisma.IdentityFindFirstArgs, "select" | "include">> = z.object({
  where: IdentityWhereInputSchema.optional(),
  orderBy: z.union([ IdentityOrderByWithRelationInputSchema.array(),IdentityOrderByWithRelationInputSchema ]).optional(),
  cursor: IdentityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IdentityScalarFieldEnumSchema,IdentityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default IdentityFindFirstArgsSchema;
