import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereInputSchema } from '../inputTypeSchemas/RundownItemWhereInputSchema'
import { RundownItemOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RundownItemOrderByWithAggregationInputSchema'
import { RundownItemScalarFieldEnumSchema } from '../inputTypeSchemas/RundownItemScalarFieldEnumSchema'
import { RundownItemScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RundownItemScalarWhereWithAggregatesInputSchema'

export const RundownItemGroupByArgsSchema: z.ZodType<Prisma.RundownItemGroupByArgs> = z.object({
  where: RundownItemWhereInputSchema.optional(),
  orderBy: z.union([ RundownItemOrderByWithAggregationInputSchema.array(),RundownItemOrderByWithAggregationInputSchema ]).optional(),
  by: RundownItemScalarFieldEnumSchema.array(),
  having: RundownItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RundownItemGroupByArgsSchema;
