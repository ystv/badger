import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'

export const ShowFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ShowFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ShowWhereUniqueInputSchema,
}).strict() ;

export default ShowFindUniqueOrThrowArgsSchema;
