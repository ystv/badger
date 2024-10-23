import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemCreateInputSchema } from '../inputTypeSchemas/RundownItemCreateInputSchema'
import { RundownItemUncheckedCreateInputSchema } from '../inputTypeSchemas/RundownItemUncheckedCreateInputSchema'

export const RundownItemCreateArgsSchema: z.ZodType<Omit<Prisma.RundownItemCreateArgs, "select" | "include">> = z.object({
  data: z.union([ RundownItemCreateInputSchema,RundownItemUncheckedCreateInputSchema ]),
}).strict() ;

export default RundownItemCreateArgsSchema;
