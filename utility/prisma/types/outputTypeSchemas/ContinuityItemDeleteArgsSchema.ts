import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'

export const ContinuityItemDeleteArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemDeleteArgs, "select" | "include">> = z.object({
  where: ContinuityItemWhereUniqueInputSchema,
}).strict() ;

export default ContinuityItemDeleteArgsSchema;
