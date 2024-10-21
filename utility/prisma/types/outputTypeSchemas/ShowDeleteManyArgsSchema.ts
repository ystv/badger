import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereInputSchema } from '../inputTypeSchemas/ShowWhereInputSchema'

export const ShowDeleteManyArgsSchema: z.ZodType<Prisma.ShowDeleteManyArgs> = z.object({
  where: ShowWhereInputSchema.optional(),
}).strict() ;

export default ShowDeleteManyArgsSchema;
