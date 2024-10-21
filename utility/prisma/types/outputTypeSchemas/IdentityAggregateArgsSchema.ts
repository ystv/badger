import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityWhereInputSchema } from '../inputTypeSchemas/IdentityWhereInputSchema'
import { IdentityOrderByWithRelationInputSchema } from '../inputTypeSchemas/IdentityOrderByWithRelationInputSchema'
import { IdentityWhereUniqueInputSchema } from '../inputTypeSchemas/IdentityWhereUniqueInputSchema'

export const IdentityAggregateArgsSchema: z.ZodType<Prisma.IdentityAggregateArgs> = z.object({
  where: IdentityWhereInputSchema.optional(),
  orderBy: z.union([ IdentityOrderByWithRelationInputSchema.array(),IdentityOrderByWithRelationInputSchema ]).optional(),
  cursor: IdentityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default IdentityAggregateArgsSchema;
