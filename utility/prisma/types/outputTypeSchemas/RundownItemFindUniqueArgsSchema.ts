import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'

export const RundownItemFindUniqueArgsSchema: z.ZodType<Omit<Prisma.RundownItemFindUniqueArgs, "select" | "include">> = z.object({
  where: RundownItemWhereUniqueInputSchema,
}).strict() ;

export default RundownItemFindUniqueArgsSchema;
