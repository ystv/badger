import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownCreateManyInputSchema } from '../inputTypeSchemas/RundownCreateManyInputSchema'

export const RundownCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RundownCreateManyAndReturnArgs> = z.object({
  data: z.union([ RundownCreateManyInputSchema,RundownCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RundownCreateManyAndReturnArgsSchema;
