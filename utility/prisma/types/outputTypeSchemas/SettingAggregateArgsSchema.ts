import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereInputSchema } from '../inputTypeSchemas/SettingWhereInputSchema'
import { SettingOrderByWithRelationInputSchema } from '../inputTypeSchemas/SettingOrderByWithRelationInputSchema'
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'

export const SettingAggregateArgsSchema: z.ZodType<Prisma.SettingAggregateArgs> = z.object({
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SettingAggregateArgsSchema;
