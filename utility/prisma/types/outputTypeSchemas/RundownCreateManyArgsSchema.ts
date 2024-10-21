import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownCreateManyInputSchema } from '../inputTypeSchemas/RundownCreateManyInputSchema'

export const RundownCreateManyArgsSchema: z.ZodType<Prisma.RundownCreateManyArgs> = z.object({
  data: z.union([ RundownCreateManyInputSchema,RundownCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RundownCreateManyArgsSchema;
