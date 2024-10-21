import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereInputSchema } from '../inputTypeSchemas/ShowWhereInputSchema'
import { ShowOrderByWithRelationInputSchema } from '../inputTypeSchemas/ShowOrderByWithRelationInputSchema'
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'

export const ShowAggregateArgsSchema: z.ZodType<Prisma.ShowAggregateArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithRelationInputSchema.array(),ShowOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ShowAggregateArgsSchema;
