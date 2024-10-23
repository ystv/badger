import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetUpdateManyMutationInputSchema } from '../inputTypeSchemas/AssetUpdateManyMutationInputSchema'
import { AssetUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AssetUncheckedUpdateManyInputSchema'
import { AssetWhereInputSchema } from '../inputTypeSchemas/AssetWhereInputSchema'

export const AssetUpdateManyArgsSchema: z.ZodType<Prisma.AssetUpdateManyArgs> = z.object({
  data: z.union([ AssetUpdateManyMutationInputSchema,AssetUncheckedUpdateManyInputSchema ]),
  where: AssetWhereInputSchema.optional(),
}).strict() ;

export default AssetUpdateManyArgsSchema;
