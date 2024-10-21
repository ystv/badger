import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereInputSchema } from '../inputTypeSchemas/SettingWhereInputSchema'
import { SettingOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SettingOrderByWithAggregationInputSchema'
import { SettingScalarFieldEnumSchema } from '../inputTypeSchemas/SettingScalarFieldEnumSchema'
import { SettingScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SettingScalarWhereWithAggregatesInputSchema'

export const SettingGroupByArgsSchema: z.ZodType<Prisma.SettingGroupByArgs> = z.object({
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithAggregationInputSchema.array(),SettingOrderByWithAggregationInputSchema ]).optional(),
  by: SettingScalarFieldEnumSchema.array(),
  having: SettingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SettingGroupByArgsSchema;
