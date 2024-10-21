import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemCreateManyInputSchema } from '../inputTypeSchemas/RundownItemCreateManyInputSchema'

export const RundownItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RundownItemCreateManyAndReturnArgs> = z.object({
  data: z.union([ RundownItemCreateManyInputSchema,RundownItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RundownItemCreateManyAndReturnArgsSchema;
