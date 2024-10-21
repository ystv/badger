import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'
import { SettingCreateInputSchema } from '../inputTypeSchemas/SettingCreateInputSchema'
import { SettingUncheckedCreateInputSchema } from '../inputTypeSchemas/SettingUncheckedCreateInputSchema'
import { SettingUpdateInputSchema } from '../inputTypeSchemas/SettingUpdateInputSchema'
import { SettingUncheckedUpdateInputSchema } from '../inputTypeSchemas/SettingUncheckedUpdateInputSchema'

export const SettingUpsertArgsSchema: z.ZodType<Omit<Prisma.SettingUpsertArgs, "select">> = z.object({
  where: SettingWhereUniqueInputSchema,
  create: z.union([ SettingCreateInputSchema,SettingUncheckedCreateInputSchema ]),
  update: z.union([ SettingUpdateInputSchema,SettingUncheckedUpdateInputSchema ]),
}).strict() ;

export default SettingUpsertArgsSchema;
