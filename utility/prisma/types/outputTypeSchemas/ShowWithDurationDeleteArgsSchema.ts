import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowWithDurationWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWithDurationWhereUniqueInputSchema'

export const ShowWithDurationDeleteArgsSchema: z.ZodType<Omit<Prisma.ShowWithDurationDeleteArgs, "select">> = z.object({
  where: ShowWithDurationWhereUniqueInputSchema,
}).strict() ;

export default ShowWithDurationDeleteArgsSchema;
