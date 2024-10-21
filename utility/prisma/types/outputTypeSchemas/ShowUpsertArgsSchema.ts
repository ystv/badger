import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'
import { ShowCreateInputSchema } from '../inputTypeSchemas/ShowCreateInputSchema'
import { ShowUncheckedCreateInputSchema } from '../inputTypeSchemas/ShowUncheckedCreateInputSchema'
import { ShowUpdateInputSchema } from '../inputTypeSchemas/ShowUpdateInputSchema'
import { ShowUncheckedUpdateInputSchema } from '../inputTypeSchemas/ShowUncheckedUpdateInputSchema'

export const ShowUpsertArgsSchema: z.ZodType<Omit<Prisma.ShowUpsertArgs, "select" | "include">> = z.object({
  where: ShowWhereUniqueInputSchema,
  create: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
  update: z.union([ ShowUpdateInputSchema,ShowUncheckedUpdateInputSchema ]),
}).strict() ;

export default ShowUpsertArgsSchema;
