import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingCreateInputSchema } from '../inputTypeSchemas/SettingCreateInputSchema'
import { SettingUncheckedCreateInputSchema } from '../inputTypeSchemas/SettingUncheckedCreateInputSchema'

export const SettingCreateArgsSchema: z.ZodType<Omit<Prisma.SettingCreateArgs, "select">> = z.object({
  data: z.union([ SettingCreateInputSchema,SettingUncheckedCreateInputSchema ]),
}).strict() ;

export default SettingCreateArgsSchema;
