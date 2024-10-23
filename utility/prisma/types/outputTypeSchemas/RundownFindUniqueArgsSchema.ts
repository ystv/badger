import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'

export const RundownFindUniqueArgsSchema: z.ZodType<Omit<Prisma.RundownFindUniqueArgs, "select" | "include">> = z.object({
  where: RundownWhereUniqueInputSchema,
}).strict() ;

export default RundownFindUniqueArgsSchema;
