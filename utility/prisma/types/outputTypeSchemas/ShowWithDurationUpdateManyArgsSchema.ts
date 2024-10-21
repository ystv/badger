import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationUpdateManyMutationInputSchema } from '../inputTypeSchemas/ShowWithDurationUpdateManyMutationInputSchema'
import { ShowWithDurationUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ShowWithDurationUncheckedUpdateManyInputSchema'
import { ShowWithDurationWhereInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereInputSchema'

export const ShowWithDurationUpdateManyArgsSchema: z.ZodType<Prisma.ShowWithDurationUpdateManyArgs> = z.object({
  data: z.union([ ShowWithDurationUpdateManyMutationInputSchema,ShowWithDurationUncheckedUpdateManyInputSchema ]),
  where: ShowWithDurationWhereInputSchema.optional(),
}).strict() ;

export default ShowWithDurationUpdateManyArgsSchema;
