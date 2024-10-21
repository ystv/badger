import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionCreateManyInputSchema } from '../inputTypeSchemas/ConnectionCreateManyInputSchema'

export const ConnectionCreateManyArgsSchema: z.ZodType<Prisma.ConnectionCreateManyArgs> = z.object({
  data: z.union([ ConnectionCreateManyInputSchema,ConnectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ConnectionCreateManyArgsSchema;
