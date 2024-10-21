import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereInputSchema } from '../inputTypeSchemas/RundownItemWhereInputSchema'
import { RundownItemOrderByWithRelationInputSchema } from '../inputTypeSchemas/RundownItemOrderByWithRelationInputSchema'
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'

export const RundownItemAggregateArgsSchema: z.ZodType<Prisma.RundownItemAggregateArgs> = z.object({
  where: RundownItemWhereInputSchema.optional(),
  orderBy: z.union([ RundownItemOrderByWithRelationInputSchema.array(),RundownItemOrderByWithRelationInputSchema ]).optional(),
  cursor: RundownItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RundownItemAggregateArgsSchema;
