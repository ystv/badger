import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'
import { RundownCreateInputSchema } from '../inputTypeSchemas/RundownCreateInputSchema'
import { RundownUncheckedCreateInputSchema } from '../inputTypeSchemas/RundownUncheckedCreateInputSchema'
import { RundownUpdateInputSchema } from '../inputTypeSchemas/RundownUpdateInputSchema'
import { RundownUncheckedUpdateInputSchema } from '../inputTypeSchemas/RundownUncheckedUpdateInputSchema'

export const RundownUpsertArgsSchema: z.ZodType<Omit<Prisma.RundownUpsertArgs, "select" | "include">> = z.object({
  where: RundownWhereUniqueInputSchema,
  create: z.union([ RundownCreateInputSchema,RundownUncheckedCreateInputSchema ]),
  update: z.union([ RundownUpdateInputSchema,RundownUncheckedUpdateInputSchema ]),
}).strict() ;

export default RundownUpsertArgsSchema;
