import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowCreateInputSchema } from '../inputTypeSchemas/ShowCreateInputSchema'
import { ShowUncheckedCreateInputSchema } from '../inputTypeSchemas/ShowUncheckedCreateInputSchema'

export const ShowCreateArgsSchema: z.ZodType<Omit<Prisma.ShowCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ShowCreateInputSchema,ShowUncheckedCreateInputSchema ]),
}).strict() ;

export default ShowCreateArgsSchema;
