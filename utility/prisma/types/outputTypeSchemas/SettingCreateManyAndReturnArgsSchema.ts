import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingCreateManyInputSchema } from '../inputTypeSchemas/SettingCreateManyInputSchema'

export const SettingCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SettingCreateManyAndReturnArgs> = z.object({
  data: z.union([ SettingCreateManyInputSchema,SettingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SettingCreateManyAndReturnArgsSchema;
