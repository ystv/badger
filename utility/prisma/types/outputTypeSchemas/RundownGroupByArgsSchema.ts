import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereInputSchema } from '../inputTypeSchemas/RundownWhereInputSchema'
import { RundownOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RundownOrderByWithAggregationInputSchema'
import { RundownScalarFieldEnumSchema } from '../inputTypeSchemas/RundownScalarFieldEnumSchema'
import { RundownScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RundownScalarWhereWithAggregatesInputSchema'

export const RundownGroupByArgsSchema: z.ZodType<Prisma.RundownGroupByArgs> = z.object({
  where: RundownWhereInputSchema.optional(),
  orderBy: z.union([ RundownOrderByWithAggregationInputSchema.array(),RundownOrderByWithAggregationInputSchema ]).optional(),
  by: RundownScalarFieldEnumSchema.array(),
  having: RundownScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RundownGroupByArgsSchema;
