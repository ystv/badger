import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowUpdateInputSchema } from '../inputTypeSchemas/ShowUpdateInputSchema'
import { ShowUncheckedUpdateInputSchema } from '../inputTypeSchemas/ShowUncheckedUpdateInputSchema'
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'

export const ShowUpdateArgsSchema: z.ZodType<Omit<Prisma.ShowUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export default ShowUpdateArgsSchema;
