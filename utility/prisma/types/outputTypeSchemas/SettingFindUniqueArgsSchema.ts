import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'

export const SettingFindUniqueArgsSchema: z.ZodType<Omit<Prisma.SettingFindUniqueArgs, "select">> = z.object({
  where: SettingWhereUniqueInputSchema,
}).strict() ;

export default SettingFindUniqueArgsSchema;
