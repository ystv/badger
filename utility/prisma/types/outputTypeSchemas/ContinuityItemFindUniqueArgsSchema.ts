import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'

export const ContinuityItemFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemFindUniqueArgs, "select" | "include">> = z.object({
  where: ContinuityItemWhereUniqueInputSchema,
}).strict() ;

export default ContinuityItemFindUniqueArgsSchema;
