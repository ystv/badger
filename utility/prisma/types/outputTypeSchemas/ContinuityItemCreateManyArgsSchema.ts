import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemCreateManyInputSchema } from '../inputTypeSchemas/ContinuityItemCreateManyInputSchema'

export const ContinuityItemCreateManyArgsSchema: z.ZodType<Prisma.ContinuityItemCreateManyArgs> = z.object({
  data: z.union([ ContinuityItemCreateManyInputSchema,ContinuityItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ContinuityItemCreateManyArgsSchema;
