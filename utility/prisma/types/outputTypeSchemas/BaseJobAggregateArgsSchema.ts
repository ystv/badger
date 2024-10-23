import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereInputSchema } from '../inputTypeSchemas/BaseJobWhereInputSchema'
import { BaseJobOrderByWithRelationInputSchema } from '../inputTypeSchemas/BaseJobOrderByWithRelationInputSchema'
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'

export const BaseJobAggregateArgsSchema: z.ZodType<Prisma.BaseJobAggregateArgs> = z.object({
  where: BaseJobWhereInputSchema.optional(),
  orderBy: z.union([ BaseJobOrderByWithRelationInputSchema.array(),BaseJobOrderByWithRelationInputSchema ]).optional(),
  cursor: BaseJobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BaseJobAggregateArgsSchema;
