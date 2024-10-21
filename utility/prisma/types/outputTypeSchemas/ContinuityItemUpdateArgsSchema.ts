import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemUpdateInputSchema } from '../inputTypeSchemas/ContinuityItemUpdateInputSchema'
import { ContinuityItemUncheckedUpdateInputSchema } from '../inputTypeSchemas/ContinuityItemUncheckedUpdateInputSchema'
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'

export const ContinuityItemUpdateArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ContinuityItemUpdateInputSchema,ContinuityItemUncheckedUpdateInputSchema ]),
  where: ContinuityItemWhereUniqueInputSchema,
}).strict() ;

export default ContinuityItemUpdateArgsSchema;
