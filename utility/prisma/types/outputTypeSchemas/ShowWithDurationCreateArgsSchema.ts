import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationCreateInputSchema } from '../inputTypeSchemas/ShowWithDurationCreateInputSchema'
import { ShowWithDurationUncheckedCreateInputSchema } from '../inputTypeSchemas/ShowWithDurationUncheckedCreateInputSchema'

export const ShowWithDurationCreateArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationCreateArgs, "select">> = z.object({
  data: z.union([ ShowWithDurationCreateInputSchema,ShowWithDurationUncheckedCreateInputSchema ]),
}).strict() ;

export default ShowWithDurationCreateArgsSchema;
