import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'
import { AssetCreateInputSchema } from '../inputTypeSchemas/AssetCreateInputSchema'
import { AssetUncheckedCreateInputSchema } from '../inputTypeSchemas/AssetUncheckedCreateInputSchema'
import { AssetUpdateInputSchema } from '../inputTypeSchemas/AssetUpdateInputSchema'
import { AssetUncheckedUpdateInputSchema } from '../inputTypeSchemas/AssetUncheckedUpdateInputSchema'

export const AssetUpsertArgsSchema: z.ZodType<Omit<Prisma.AssetUpsertArgs, "select" | "include">> = z.object({
  where: AssetWhereUniqueInputSchema,
  create: z.union([ AssetCreateInputSchema,AssetUncheckedCreateInputSchema ]),
  update: z.union([ AssetUpdateInputSchema,AssetUncheckedUpdateInputSchema ]),
}).strict() ;

export default AssetUpsertArgsSchema;
