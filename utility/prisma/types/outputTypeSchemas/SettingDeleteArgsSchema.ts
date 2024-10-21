import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'

export const SettingDeleteArgsSchema: z.ZodType<Omit<Prisma.SettingDeleteArgs, "select">> = z.object({
  where: SettingWhereUniqueInputSchema,
}).strict() ;

export default SettingDeleteArgsSchema;
