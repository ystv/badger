import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingUpdateInputSchema } from '../inputTypeSchemas/SettingUpdateInputSchema'
import { SettingUncheckedUpdateInputSchema } from '../inputTypeSchemas/SettingUncheckedUpdateInputSchema'
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'

export const SettingUpdateArgsSchema: z.ZodType<Omit<Prisma.SettingUpdateArgs, "select">> = z.object({
  data: z.union([ SettingUpdateInputSchema,SettingUncheckedUpdateInputSchema ]),
  where: SettingWhereUniqueInputSchema,
}).strict() ;

export default SettingUpdateArgsSchema;
