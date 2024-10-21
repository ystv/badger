import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemUpdateManyMutationInputSchema } from '../inputTypeSchemas/RundownItemUpdateManyMutationInputSchema'
import { RundownItemUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RundownItemUncheckedUpdateManyInputSchema'
import { RundownItemWhereInputSchema } from '../inputTypeSchemas/RundownItemWhereInputSchema'

export const RundownItemUpdateManyArgsSchema: z.ZodType<Prisma.RundownItemUpdateManyArgs> = z.object({
  data: z.union([ RundownItemUpdateManyMutationInputSchema,RundownItemUncheckedUpdateManyInputSchema ]),
  where: RundownItemWhereInputSchema.optional(),
}).strict() ;

export default RundownItemUpdateManyArgsSchema;
