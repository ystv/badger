import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'

export const ShowDeleteArgsSchema: z.ZodType<Omit<Prisma.ShowDeleteArgs, "select" | "include">> = z.object({
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export default ShowDeleteArgsSchema;
