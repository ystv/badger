import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereInputSchema } from '../inputTypeSchemas/ContinuityItemWhereInputSchema'
import { ContinuityItemOrderByWithRelationInputSchema } from '../inputTypeSchemas/ContinuityItemOrderByWithRelationInputSchema'
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'

export const ContinuityItemAggregateArgsSchema: z.ZodType<Prisma.ContinuityItemAggregateArgs> = z.object({
  where: ContinuityItemWhereInputSchema.optional(),
  orderBy: z.union([ ContinuityItemOrderByWithRelationInputSchema.array(),ContinuityItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ContinuityItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ContinuityItemAggregateArgsSchema;
