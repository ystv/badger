import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemWhereUniqueInputSchema } from '../inputTypeSchemas/ContinuityItemWhereUniqueInputSchema'
import { ContinuityItemCreateInputSchema } from '../inputTypeSchemas/ContinuityItemCreateInputSchema'
import { ContinuityItemUncheckedCreateInputSchema } from '../inputTypeSchemas/ContinuityItemUncheckedCreateInputSchema'
import { ContinuityItemUpdateInputSchema } from '../inputTypeSchemas/ContinuityItemUpdateInputSchema'
import { ContinuityItemUncheckedUpdateInputSchema } from '../inputTypeSchemas/ContinuityItemUncheckedUpdateInputSchema'

export const ContinuityItemUpsertArgsSchema: z.ZodType<Omit<Prisma.ContinuityItemUpsertArgs, "select" | "include">> = z.object({
  where: ContinuityItemWhereUniqueInputSchema,
  create: z.union([ ContinuityItemCreateInputSchema,ContinuityItemUncheckedCreateInputSchema ]),
  update: z.union([ ContinuityItemUpdateInputSchema,ContinuityItemUncheckedUpdateInputSchema ]),
}).strict() ;

export default ContinuityItemUpsertArgsSchema;
