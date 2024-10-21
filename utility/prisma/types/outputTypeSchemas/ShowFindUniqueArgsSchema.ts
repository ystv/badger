import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'

export const ShowFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ShowFindUniqueArgs, "select" | "include">> = z.object({
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export default ShowFindUniqueArgsSchema;
