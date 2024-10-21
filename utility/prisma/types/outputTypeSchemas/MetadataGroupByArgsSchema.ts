import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereInputSchema } from '../inputTypeSchemas/MetadataWhereInputSchema'
import { MetadataOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MetadataOrderByWithAggregationInputSchema'
import { MetadataScalarFieldEnumSchema } from '../inputTypeSchemas/MetadataScalarFieldEnumSchema'
import { MetadataScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MetadataScalarWhereWithAggregatesInputSchema'

export const MetadataGroupByArgsSchema: z.ZodType<Prisma.MetadataGroupByArgs> = z.object({
  where: MetadataWhereInputSchema.optional(),
  orderBy: z.union([ MetadataOrderByWithAggregationInputSchema.array(),MetadataOrderByWithAggregationInputSchema ]).optional(),
  by: MetadataScalarFieldEnumSchema.array(),
  having: MetadataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MetadataGroupByArgsSchema;
