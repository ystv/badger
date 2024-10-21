import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereInputSchema } from '../inputTypeSchemas/MetadataFieldWhereInputSchema'
import { MetadataFieldOrderByWithRelationInputSchema } from '../inputTypeSchemas/MetadataFieldOrderByWithRelationInputSchema'
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'
import { MetadataFieldScalarFieldEnumSchema } from '../inputTypeSchemas/MetadataFieldScalarFieldEnumSchema'

export const MetadataFieldFindManyArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldFindManyArgs, "select" | "include">> = z.object({
  where: MetadataFieldWhereInputSchema.optional(),
  orderBy: z.union([ MetadataFieldOrderByWithRelationInputSchema.array(),MetadataFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: MetadataFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MetadataFieldScalarFieldEnumSchema,MetadataFieldScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default MetadataFieldFindManyArgsSchema;
