import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemWhereInputSchema } from '../inputTypeSchemas/RundownItemWhereInputSchema'

export const RundownItemDeleteManyArgsSchema: z.ZodType<Prisma.RundownItemDeleteManyArgs> = z.object({
  where: RundownItemWhereInputSchema.optional(),
}).strict() ;

export default RundownItemDeleteManyArgsSchema;
