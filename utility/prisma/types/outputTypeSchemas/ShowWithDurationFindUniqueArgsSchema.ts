import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'

export const ShowWithDurationFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationFindUniqueArgs, "select">> = z.object({
  where: ShowWithDurationWhereUniqueInputSchema,
}).strict() ;

export default ShowWithDurationFindUniqueArgsSchema;
