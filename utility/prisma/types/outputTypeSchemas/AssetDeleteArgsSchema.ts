import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'

export const AssetDeleteArgsSchema: z.ZodType<Omit<Prisma.AssetDeleteArgs, "select" | "include">> = z.object({
  where: AssetWhereUniqueInputSchema,
}).strict() ;

export default AssetDeleteArgsSchema;
