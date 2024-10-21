import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemCreateInputSchema } from '../inputTypeSchemas/ContinuityItemCreateInputSchema'
import { ContinuityItemUncheckedCreateInputSchema } from '../inputTypeSchemas/ContinuityItemUncheckedCreateInputSchema'

export const ContinuityItemCreateArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ContinuityItemCreateInputSchema,ContinuityItemUncheckedCreateInputSchema ]),
}).strict() ;

export default ContinuityItemCreateArgsSchema;
