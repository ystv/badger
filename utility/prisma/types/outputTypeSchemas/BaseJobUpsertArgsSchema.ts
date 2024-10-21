import { z } from 'zod';
import type { Prisma } from '../../client';
import { BaseJobWhereUniqueInputSchema } from '../inputTypeSchemas/BaseJobWhereUniqueInputSchema'
import { BaseJobCreateInputSchema } from '../inputTypeSchemas/BaseJobCreateInputSchema'
import { BaseJobUncheckedCreateInputSchema } from '../inputTypeSchemas/BaseJobUncheckedCreateInputSchema'
import { BaseJobUpdateInputSchema } from '../inputTypeSchemas/BaseJobUpdateInputSchema'
import { BaseJobUncheckedUpdateInputSchema } from '../inputTypeSchemas/BaseJobUncheckedUpdateInputSchema'

export const BaseJobUpsertArgsSchema: z.ZodType<Omit<Prisma.BaseJobUpsertArgs, "select">> = z.object({
  where: BaseJobWhereUniqueInputSchema,
  create: z.union([ BaseJobCreateInputSchema,BaseJobUncheckedCreateInputSchema ]),
  update: z.union([ BaseJobUpdateInputSchema,BaseJobUncheckedUpdateInputSchema ]),
}).strict() ;

export default BaseJobUpsertArgsSchema;
