import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowCreateManyInputSchema } from '../inputTypeSchemas/ShowCreateManyInputSchema'

export const ShowCreateManyArgsSchema: z.ZodType<Prisma.ShowCreateManyArgs> = z.object({
  data: z.union([ ShowCreateManyInputSchema,ShowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ShowCreateManyArgsSchema;
