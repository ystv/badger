import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereInputSchema } from '../inputTypeSchemas/MetadataWhereInputSchema'
import { MetadataOrderByWithRelationInputSchema } from '../inputTypeSchemas/MetadataOrderByWithRelationInputSchema'
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'

export const MetadataAggregateArgsSchema: z.ZodType<Prisma.MetadataAggregateArgs> = z.object({
  where: MetadataWhereInputSchema.optional(),
  orderBy: z.union([ MetadataOrderByWithRelationInputSchema.array(),MetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: MetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MetadataAggregateArgsSchema;
