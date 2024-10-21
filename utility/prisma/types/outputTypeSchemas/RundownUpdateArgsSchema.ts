import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownUpdateInputSchema } from '../inputTypeSchemas/RundownUpdateInputSchema'
import { RundownUncheckedUpdateInputSchema } from '../inputTypeSchemas/RundownUncheckedUpdateInputSchema'
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'

export const RundownUpdateArgsSchema: z.ZodType<Omit<Prisma.RundownUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ RundownUpdateInputSchema,RundownUncheckedUpdateInputSchema ]),
  where: RundownWhereUniqueInputSchema,
}).strict() ;

export default RundownUpdateArgsSchema;
