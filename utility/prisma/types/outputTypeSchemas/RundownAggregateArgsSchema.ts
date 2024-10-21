import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereInputSchema } from '../inputTypeSchemas/RundownWhereInputSchema'
import { RundownOrderByWithRelationInputSchema } from '../inputTypeSchemas/RundownOrderByWithRelationInputSchema'
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'

export const RundownAggregateArgsSchema: z.ZodType<Prisma.RundownAggregateArgs> = z.object({
  where: RundownWhereInputSchema.optional(),
  orderBy: z.union([ RundownOrderByWithRelationInputSchema.array(),RundownOrderByWithRelationInputSchema ]).optional(),
  cursor: RundownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RundownAggregateArgsSchema;
