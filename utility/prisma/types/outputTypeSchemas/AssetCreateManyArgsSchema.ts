import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetCreateManyInputSchema } from '../inputTypeSchemas/AssetCreateManyInputSchema'

export const AssetCreateManyArgsSchema: z.ZodType<Prisma.AssetCreateManyArgs> = z.object({
  data: z.union([ AssetCreateManyInputSchema,AssetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default AssetCreateManyArgsSchema;
