import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetWhereUniqueInputSchema } from '../inputTypeSchemas/AssetWhereUniqueInputSchema'

export const AssetFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AssetFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AssetWhereUniqueInputSchema,
}).strict() ;

export default AssetFindUniqueOrThrowArgsSchema;
