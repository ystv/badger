import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'

export const BaseJobDeleteArgsSchema: z.ZodType<Omit<Prisma.BaseJobDeleteArgs, "select">> = z.object({
  where: BaseJobWhereUniqueInputSchema,
}).strict() ;

export default BaseJobDeleteArgsSchema;
