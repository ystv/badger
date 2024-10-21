import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowUpdateManyMutationInputSchema } from '../inputTypeSchemas/ShowUpdateManyMutationInputSchema'
import { ShowUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ShowUncheckedUpdateManyInputSchema'
import { ShowWhereInputSchema } from '../inputTypeSchemas/ShowWhereInputSchema'

export const ShowUpdateManyArgsSchema: z.ZodType<Prisma.ShowUpdateManyArgs> = z.object({
  data: z.union([ ShowUpdateManyMutationInputSchema,ShowUncheckedUpdateManyInputSchema ]),
  where: ShowWhereInputSchema.optional(),
}).strict() ;

export default ShowUpdateManyArgsSchema;
