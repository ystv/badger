import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereInputSchema } from '../inputTypeSchemas/MetadataFieldWhereInputSchema'
import { MetadataFieldOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MetadataFieldOrderByWithAggregationInputSchema'
import { MetadataFieldScalarFieldEnumSchema } from '../inputTypeSchemas/MetadataFieldScalarFieldEnumSchema'
import { MetadataFieldScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MetadataFieldScalarWhereWithAggregatesInputSchema'

export const MetadataFieldGroupByArgsSchema: z.ZodType<Prisma.MetadataFieldGroupByArgs> = z.object({
  where: MetadataFieldWhereInputSchema.optional(),
  orderBy: z.union([ MetadataFieldOrderByWithAggregationInputSchema.array(),MetadataFieldOrderByWithAggregationInputSchema ]).optional(),
  by: MetadataFieldScalarFieldEnumSchema.array(),
  having: MetadataFieldScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MetadataFieldGroupByArgsSchema;
