import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereInputSchema } from '../inputTypeSchemas/ShowWhereInputSchema'
import { ShowOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ShowOrderByWithAggregationInputSchema'
import { ShowScalarFieldEnumSchema } from '../inputTypeSchemas/ShowScalarFieldEnumSchema'
import { ShowScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ShowScalarWhereWithAggregatesInputSchema'

export const ShowGroupByArgsSchema: z.ZodType<Prisma.ShowGroupByArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
  orderBy: z.union([ ShowOrderByWithAggregationInputSchema.array(),ShowOrderByWithAggregationInputSchema ]).optional(),
  by: ShowScalarFieldEnumSchema.array(),
  having: ShowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ShowGroupByArgsSchema;
