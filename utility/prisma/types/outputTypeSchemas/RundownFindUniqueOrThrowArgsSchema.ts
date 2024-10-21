import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'

export const RundownFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.RundownFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: RundownWhereUniqueInputSchema,
}).strict() ;

export default RundownFindUniqueOrThrowArgsSchema;
