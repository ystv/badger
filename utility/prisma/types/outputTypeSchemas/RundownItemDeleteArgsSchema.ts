import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'

export const RundownItemDeleteArgsSchema: z.ZodType<Omit<Prisma.RundownItemDeleteArgs, "select" | "include">> = z.object({
  where: RundownItemWhereUniqueInputSchema,
}).strict() ;

export default RundownItemDeleteArgsSchema;
