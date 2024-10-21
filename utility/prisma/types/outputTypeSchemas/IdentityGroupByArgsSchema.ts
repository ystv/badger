import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereInputSchema } from '../inputTypeSchemas/IdentityWhereInputSchema'
import { IdentityOrderByWithAggregationInputSchema } from '../inputTypeSchemas/IdentityOrderByWithAggregationInputSchema'
import { IdentityScalarFieldEnumSchema } from '../inputTypeSchemas/IdentityScalarFieldEnumSchema'
import { IdentityScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/IdentityScalarWhereWithAggregatesInputSchema'

export const IdentityGroupByArgsSchema: z.ZodType<Prisma.IdentityGroupByArgs> = z.object({
  where: IdentityWhereInputSchema.optional(),
  orderBy: z.union([ IdentityOrderByWithAggregationInputSchema.array(),IdentityOrderByWithAggregationInputSchema ]).optional(),
  by: IdentityScalarFieldEnumSchema.array(),
  having: IdentityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default IdentityGroupByArgsSchema;
