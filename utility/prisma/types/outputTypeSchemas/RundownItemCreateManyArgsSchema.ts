import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemCreateManyInputSchema } from '../inputTypeSchemas/RundownItemCreateManyInputSchema'

export const RundownItemCreateManyArgsSchema: z.ZodType<Prisma.RundownItemCreateManyArgs> = z.object({
  data: z.union([ RundownItemCreateManyInputSchema,RundownItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RundownItemCreateManyArgsSchema;
