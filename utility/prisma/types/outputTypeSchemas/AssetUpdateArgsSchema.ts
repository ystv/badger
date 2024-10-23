import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetUpdateInputSchema } from '../inputTypeSchemas/AssetUpdateInputSchema'
import { AssetUncheckedUpdateInputSchema } from '../inputTypeSchemas/AssetUncheckedUpdateInputSchema'
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'

export const AssetUpdateArgsSchema: z.ZodType<Omit<Prisma.AssetUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AssetUpdateInputSchema,AssetUncheckedUpdateInputSchema ]),
  where: AssetWhereUniqueInputSchema,
}).strict() ;

export default AssetUpdateArgsSchema;
