import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemCreateManyInputSchema } from '../inputTypeSchemas/ContinuityItemCreateManyInputSchema'

export const ContinuityItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ContinuityItemCreateManyAndReturnArgs> = z.object({
  data: z.union([ ContinuityItemCreateManyInputSchema,ContinuityItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ContinuityItemCreateManyAndReturnArgsSchema;
