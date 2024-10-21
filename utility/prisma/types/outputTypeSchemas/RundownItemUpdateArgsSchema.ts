import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemUpdateInputSchema } from '../inputTypeSchemas/RundownItemUpdateInputSchema'
import { RundownItemUncheckedUpdateInputSchema } from '../inputTypeSchemas/RundownItemUncheckedUpdateInputSchema'
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'

export const RundownItemUpdateArgsSchema: z.ZodType<Omit<Prisma.RundownItemUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ RundownItemUpdateInputSchema,RundownItemUncheckedUpdateInputSchema ]),
  where: RundownItemWhereUniqueInputSchema,
}).strict() ;

export default RundownItemUpdateArgsSchema;
