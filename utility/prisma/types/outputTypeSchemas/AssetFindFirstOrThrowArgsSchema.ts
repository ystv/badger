import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereInputSchema } from '../inputTypeSchemas/AssetWhereInputSchema'
import { AssetOrderByWithRelationInputSchema } from '../inputTypeSchemas/AssetOrderByWithRelationInputSchema'
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'
import { AssetScalarFieldEnumSchema } from '../inputTypeSchemas/AssetScalarFieldEnumSchema'

export const AssetFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.AssetFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: AssetWhereInputSchema.optional(),
  orderBy: z.union([ AssetOrderByWithRelationInputSchema.array(),AssetOrderByWithRelationInputSchema ]).optional(),
  cursor: AssetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssetScalarFieldEnumSchema,AssetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default AssetFindFirstOrThrowArgsSchema;
