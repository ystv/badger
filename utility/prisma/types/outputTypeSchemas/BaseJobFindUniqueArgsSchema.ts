import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'

export const BaseJobFindUniqueArgsSchema: z.ZodType<Omit<Prisma.BaseJobFindUniqueArgs, "select">> = z.object({
  where: BaseJobWhereUniqueInputSchema,
}).strict() ;

export default BaseJobFindUniqueArgsSchema;
