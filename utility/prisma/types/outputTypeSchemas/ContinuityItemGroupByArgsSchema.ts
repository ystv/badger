import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereInputSchema } from '../inputTypeSchemas/ContinuityItemWhereInputSchema'
import { ContinuityItemOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ContinuityItemOrderByWithAggregationInputSchema'
import { ContinuityItemScalarFieldEnumSchema } from '../inputTypeSchemas/ContinuityItemScalarFieldEnumSchema'
import { ContinuityItemScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ContinuityItemScalarWhereWithAggregatesInputSchema'

export const ContinuityItemGroupByArgsSchema: z.ZodType<Prisma.ContinuityItemGroupByArgs> = z.object({
  where: ContinuityItemWhereInputSchema.optional(),
  orderBy: z.union([ ContinuityItemOrderByWithAggregationInputSchema.array(),ContinuityItemOrderByWithAggregationInputSchema ]).optional(),
  by: ContinuityItemScalarFieldEnumSchema.array(),
  having: ContinuityItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ContinuityItemGroupByArgsSchema;
