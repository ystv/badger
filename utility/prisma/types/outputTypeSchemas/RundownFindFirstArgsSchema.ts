import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereInputSchema } from '../inputTypeSchemas/RundownWhereInputSchema'
import { RundownOrderByWithRelationInputSchema } from '../inputTypeSchemas/RundownOrderByWithRelationInputSchema'
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'
import { RundownScalarFieldEnumSchema } from '../inputTypeSchemas/RundownScalarFieldEnumSchema'

export const RundownFindFirstArgsSchema: z.ZodType<Omit<Prisma.RundownFindFirstArgs, "select" | "include">> = z.object({
  where: RundownWhereInputSchema.optional(),
  orderBy: z.union([ RundownOrderByWithRelationInputSchema.array(),RundownOrderByWithRelationInputSchema ]).optional(),
  cursor: RundownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RundownScalarFieldEnumSchema,RundownScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RundownFindFirstArgsSchema;
