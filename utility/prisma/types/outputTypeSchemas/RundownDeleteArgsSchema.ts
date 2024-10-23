import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownWhereUniqueInputSchema } from '../inputTypeSchemas/RundownWhereUniqueInputSchema'

export const RundownDeleteArgsSchema: z.ZodType<Omit<Prisma.RundownDeleteArgs, "select" | "include">> = z.object({
  where: RundownWhereUniqueInputSchema,
}).strict() ;

export default RundownDeleteArgsSchema;
