import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereInputSchema'
import { ShowWithDurationOrderByWithRelationInputSchema } from '../inputTypeSchemas/ShowWithDurationOrderByWithRelationInputSchema'
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'

export const ShowWithDurationAggregateArgsSchema: z.ZodType<Prisma.ShowWithDurationAggregateArgs> = z.object({
  where: ShowWithDurationWhereInputSchema.optional(),
  orderBy: z.union([ ShowWithDurationOrderByWithRelationInputSchema.array(),ShowWithDurationOrderByWithRelationInputSchema ]).optional(),
  cursor: ShowWithDurationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ShowWithDurationAggregateArgsSchema;
