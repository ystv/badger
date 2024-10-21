import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationCreateManyInputSchema } from '../inputTypeSchemas/ShowWithDurationCreateManyInputSchema'

export const ShowWithDurationCreateManyArgsSchema: z.ZodType<Prisma.ShowWithDurationCreateManyArgs> = z.object({
  data: z.union([ ShowWithDurationCreateManyInputSchema,ShowWithDurationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ShowWithDurationCreateManyArgsSchema;
