import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'

export const ContinuityItemFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ContinuityItemWhereUniqueInputSchema,
}).strict() ;

export default ContinuityItemFindUniqueOrThrowArgsSchema;
