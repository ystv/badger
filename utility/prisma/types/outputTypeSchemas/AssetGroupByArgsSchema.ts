import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereInputSchema } from '../inputTypeSchemas/AssetWhereInputSchema'
import { AssetOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AssetOrderByWithAggregationInputSchema'
import { AssetScalarFieldEnumSchema } from '../inputTypeSchemas/AssetScalarFieldEnumSchema'
import { AssetScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AssetScalarWhereWithAggregatesInputSchema'

export const AssetGroupByArgsSchema: z.ZodType<Prisma.AssetGroupByArgs> = z.object({
  where: AssetWhereInputSchema.optional(),
  orderBy: z.union([ AssetOrderByWithAggregationInputSchema.array(),AssetOrderByWithAggregationInputSchema ]).optional(),
  by: AssetScalarFieldEnumSchema.array(),
  having: AssetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default AssetGroupByArgsSchema;
