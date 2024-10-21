import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationUpdateInputSchema } from '../inputTypeSchemas/ShowWithDurationUpdateInputSchema'
import { ShowWithDurationUncheckedUpdateInputSchema } from '../inputTypeSchemas/ShowWithDurationUncheckedUpdateInputSchema'
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'

export const ShowWithDurationUpdateArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationUpdateArgs, "select">> = z.object({
  data: z.union([ ShowWithDurationUpdateInputSchema,ShowWithDurationUncheckedUpdateInputSchema ]),
  where: ShowWithDurationWhereUniqueInputSchema,
}).strict() ;

export default ShowWithDurationUpdateArgsSchema;
