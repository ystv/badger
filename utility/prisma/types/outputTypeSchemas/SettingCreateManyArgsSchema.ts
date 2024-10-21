import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingCreateManyInputSchema } from '../inputTypeSchemas/SettingCreateManyInputSchema'

export const SettingCreateManyArgsSchema: z.ZodType<Prisma.SettingCreateManyArgs> = z.object({
  data: z.union([ SettingCreateManyInputSchema,SettingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SettingCreateManyArgsSchema;
