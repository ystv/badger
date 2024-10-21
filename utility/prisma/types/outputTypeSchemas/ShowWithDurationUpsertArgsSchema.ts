import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'
import { ShowWithDurationCreateInputSchema } from '../inputTypeSchemas/ShowWithDurationCreateInputSchema'
import { ShowWithDurationUncheckedCreateInputSchema } from '../inputTypeSchemas/ShowWithDurationUncheckedCreateInputSchema'
import { ShowWithDurationUpdateInputSchema } from '../inputTypeSchemas/ShowWithDurationUpdateInputSchema'
import { ShowWithDurationUncheckedUpdateInputSchema } from '../inputTypeSchemas/ShowWithDurationUncheckedUpdateInputSchema'

export const ShowWithDurationUpsertArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationUpsertArgs, "select">> = z.object({
  where: ShowWithDurationWhereUniqueInputSchema,
  create: z.union([ ShowWithDurationCreateInputSchema,ShowWithDurationUncheckedCreateInputSchema ]),
  update: z.union([ ShowWithDurationUpdateInputSchema,ShowWithDurationUncheckedUpdateInputSchema ]),
}).strict() ;

export default ShowWithDurationUpsertArgsSchema;
