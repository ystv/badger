import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'

export const ShowWithDurationFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationFindUniqueOrThrowArgs, "select">> = z.object({
  where: ShowWithDurationWhereUniqueInputSchema,
}).strict() ;

export default ShowWithDurationFindUniqueOrThrowArgsSchema;
