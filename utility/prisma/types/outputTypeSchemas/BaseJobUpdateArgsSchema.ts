import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobUpdateInputSchema } from '../inputTypeSchemas/BaseJobUpdateInputSchema'
import { BaseJobUncheckedUpdateInputSchema } from '../inputTypeSchemas/BaseJobUncheckedUpdateInputSchema'
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'

export const BaseJobUpdateArgsSchema: z.ZodType<Omit<Prisma.BaseJobUpdateArgs, "select">> = z.object({
  data: z.union([ BaseJobUpdateInputSchema,BaseJobUncheckedUpdateInputSchema ]),
  where: BaseJobWhereUniqueInputSchema,
}).strict() ;

export default BaseJobUpdateArgsSchema;
