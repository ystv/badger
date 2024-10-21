import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownCreateInputSchema } from '../inputTypeSchemas/RundownCreateInputSchema'
import { RundownUncheckedCreateInputSchema } from '../inputTypeSchemas/RundownUncheckedCreateInputSchema'

export const RundownCreateArgsSchema: z.ZodType<Omit<Prisma.RundownCreateArgs, "select" | "include">> = z.object({
  data: z.union([ RundownCreateInputSchema,RundownUncheckedCreateInputSchema ]),
}).strict() ;

export default RundownCreateArgsSchema;
