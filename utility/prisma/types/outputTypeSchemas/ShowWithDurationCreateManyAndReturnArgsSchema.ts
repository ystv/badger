import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationCreateManyInputSchema } from '../inputTypeSchemas/ShowWithDurationCreateManyInputSchema'

export const ShowWithDurationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShowWithDurationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShowWithDurationCreateManyInputSchema,ShowWithDurationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ShowWithDurationCreateManyAndReturnArgsSchema;
