import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'
import { RundownItemCreateInputSchema } from '../inputTypeSchemas/RundownItemCreateInputSchema'
import { RundownItemUncheckedCreateInputSchema } from '../inputTypeSchemas/RundownItemUncheckedCreateInputSchema'
import { RundownItemUpdateInputSchema } from '../inputTypeSchemas/RundownItemUpdateInputSchema'
import { RundownItemUncheckedUpdateInputSchema } from '../inputTypeSchemas/RundownItemUncheckedUpdateInputSchema'

export const RundownItemUpsertArgsSchema: z.ZodType<Omit<Prisma.RundownItemUpsertArgs, "select" | "include">> = z.object({
  where: RundownItemWhereUniqueInputSchema,
  create: z.union([ RundownItemCreateInputSchema,RundownItemUncheckedCreateInputSchema ]),
  update: z.union([ RundownItemUpdateInputSchema,RundownItemUncheckedUpdateInputSchema ]),
}).strict() ;

export default RundownItemUpsertArgsSchema;
