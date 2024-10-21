import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereUniqueInputSchema } from '../inputTypeSchemas/RundownItemWhereUniqueInputSchema'

export const RundownItemFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.RundownItemFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: RundownItemWhereUniqueInputSchema,
}).strict() ;

export default RundownItemFindUniqueOrThrowArgsSchema;
