import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereInputSchema'
import { ShowWithDurationOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ShowWithDurationOrderByWithAggregationInputSchema'
import { ShowWithDurationScalarFieldEnumSchema } from '../inputTypeSchemas/ShowWithDurationScalarFieldEnumSchema'
import { ShowWithDurationScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ShowWithDurationScalarWhereWithAggregatesInputSchema'

export const ShowWithDurationGroupByArgsSchema: z.ZodType<Prisma.ShowWithDurationGroupByArgs> = z.object({
  where: ShowWithDurationWhereInputSchema.optional(),
  orderBy: z.union([ ShowWithDurationOrderByWithAggregationInputSchema.array(),ShowWithDurationOrderByWithAggregationInputSchema ]).optional(),
  by: ShowWithDurationScalarFieldEnumSchema.array(),
  having: ShowWithDurationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ShowWithDurationGroupByArgsSchema;
