import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereInputSchema } from '../inputTypeSchemas/AssetWhereInputSchema'
import { AssetOrderByWithRelationInputSchema } from '../inputTypeSchemas/AssetOrderByWithRelationInputSchema'
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'

export const AssetAggregateArgsSchema: z.ZodType<Prisma.AssetAggregateArgs> = z.object({
  where: AssetWhereInputSchema.optional(),
  orderBy: z.union([ AssetOrderByWithRelationInputSchema.array(),AssetOrderByWithRelationInputSchema ]).optional(),
  cursor: AssetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default AssetAggregateArgsSchema;
