import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereInputSchema } from '../inputTypeSchemas/MetadataFieldWhereInputSchema'
import { MetadataFieldOrderByWithRelationInputSchema } from '../inputTypeSchemas/MetadataFieldOrderByWithRelationInputSchema'
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'

export const MetadataFieldAggregateArgsSchema: z.ZodType<Prisma.MetadataFieldAggregateArgs> = z.object({
  where: MetadataFieldWhereInputSchema.optional(),
  orderBy: z.union([ MetadataFieldOrderByWithRelationInputSchema.array(),MetadataFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: MetadataFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MetadataFieldAggregateArgsSchema;
