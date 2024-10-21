import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowCreateManyInputSchema } from '../inputTypeSchemas/ShowCreateManyInputSchema'

export const ShowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ShowCreateManyAndReturnArgsSchema;
