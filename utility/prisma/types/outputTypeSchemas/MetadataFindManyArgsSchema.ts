import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereInputSchema } from '../inputTypeSchemas/MetadataWhereInputSchema'
import { MetadataOrderByWithRelationInputSchema } from '../inputTypeSchemas/MetadataOrderByWithRelationInputSchema'
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'
import { MetadataScalarFieldEnumSchema } from '../inputTypeSchemas/MetadataScalarFieldEnumSchema'

export const MetadataFindManyArgsSchema: z.ZodType<Omit<Prisma.MetadataFindManyArgs, "select" | "include">> = z.object({
  where: MetadataWhereInputSchema.optional(),
  orderBy: z.union([ MetadataOrderByWithRelationInputSchema.array(),MetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: MetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MetadataScalarFieldEnumSchema,MetadataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default MetadataFindManyArgsSchema;
