import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereInputSchema } from '../inputTypeSchemas/RundownItemWhereInputSchema'
import { RundownItemOrderByWithRelationInputSchema } from '../inputTypeSchemas/RundownItemOrderByWithRelationInputSchema'
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'
import { RundownItemScalarFieldEnumSchema } from '../inputTypeSchemas/RundownItemScalarFieldEnumSchema'

export const RundownItemFindFirstArgsSchema: z.ZodType<Omit<Prisma.RundownItemFindFirstArgs, "select" | "include">> = z.object({
  where: RundownItemWhereInputSchema.optional(),
  orderBy: z.union([ RundownItemOrderByWithRelationInputSchema.array(),RundownItemOrderByWithRelationInputSchema ]).optional(),
  cursor: RundownItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RundownItemScalarFieldEnumSchema,RundownItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RundownItemFindFirstArgsSchema;
