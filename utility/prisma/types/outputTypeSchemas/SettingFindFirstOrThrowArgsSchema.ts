import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereInputSchema } from '../inputTypeSchemas/SettingWhereInputSchema'
import { SettingOrderByWithRelationInputSchema } from '../inputTypeSchemas/SettingOrderByWithRelationInputSchema'
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'
import { SettingScalarFieldEnumSchema } from '../inputTypeSchemas/SettingScalarFieldEnumSchema'

export const SettingFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.SettingFindFirstOrThrowArgs, "select">> = z.object({
  where: SettingWhereInputSchema.optional(),
  orderBy: z.union([ SettingOrderByWithRelationInputSchema.array(),SettingOrderByWithRelationInputSchema ]).optional(),
  cursor: SettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SettingScalarFieldEnumSchema,SettingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default SettingFindFirstOrThrowArgsSchema;
