import { z } from 'zod';
import type { Prisma } from '../../client';
import { SettingWhereUniqueInputSchema } from '../inputTypeSchemas/SettingWhereUniqueInputSchema'

export const SettingFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.SettingFindUniqueOrThrowArgs, "select">> = z.object({
  where: SettingWhereUniqueInputSchema,
}).strict() ;

export default SettingFindUniqueOrThrowArgsSchema;
