import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereInputSchema } from '../inputTypeSchemas/BaseJobWhereInputSchema'
import { BaseJobOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BaseJobOrderByWithAggregationInputSchema'
import { BaseJobScalarFieldEnumSchema } from '../inputTypeSchemas/BaseJobScalarFieldEnumSchema'
import { BaseJobScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BaseJobScalarWhereWithAggregatesInputSchema'

export const BaseJobGroupByArgsSchema: z.ZodType<Prisma.BaseJobGroupByArgs> = z.object({
  where: BaseJobWhereInputSchema.optional(),
  orderBy: z.union([ BaseJobOrderByWithAggregationInputSchema.array(),BaseJobOrderByWithAggregationInputSchema ]).optional(),
  by: BaseJobScalarFieldEnumSchema.array(),
  having: BaseJobScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default BaseJobGroupByArgsSchema;
