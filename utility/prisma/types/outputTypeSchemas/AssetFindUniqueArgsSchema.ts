import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'

export const AssetFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AssetFindUniqueArgs, "select" | "include">> = z.object({
  where: AssetWhereUniqueInputSchema,
}).strict() ;

export default AssetFindUniqueArgsSchema;
