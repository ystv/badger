import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereInputSchema } from '../inputTypeSchemas/ContinuityItemWhereInputSchema'
import { ContinuityItemOrderByWithRelationInputSchema } from '../inputTypeSchemas/ContinuityItemOrderByWithRelationInputSchema'
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'
import { ContinuityItemScalarFieldEnumSchema } from '../inputTypeSchemas/ContinuityItemScalarFieldEnumSchema'

export const ContinuityItemFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: ContinuityItemWhereInputSchema.optional(),
  orderBy: z.union([ ContinuityItemOrderByWithRelationInputSchema.array(),ContinuityItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ContinuityItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContinuityItemScalarFieldEnumSchema,ContinuityItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ContinuityItemFindFirstOrThrowArgsSchema;
