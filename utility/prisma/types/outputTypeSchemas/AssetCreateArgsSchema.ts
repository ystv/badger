import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetCreateInputSchema } from '../inputTypeSchemas/AssetCreateInputSchema'
import { AssetUncheckedCreateInputSchema } from '../inputTypeSchemas/AssetUncheckedCreateInputSchema'

export const AssetCreateArgsSchema: z.ZodType<Omit<Prisma.AssetCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AssetCreateInputSchema,AssetUncheckedCreateInputSchema ]),
}).strict() ;

export default AssetCreateArgsSchema;
