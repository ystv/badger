import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionCreateInputSchema } from '../inputTypeSchemas/ConnectionCreateInputSchema'
import { ConnectionUncheckedCreateInputSchema } from '../inputTypeSchemas/ConnectionUncheckedCreateInputSchema'

export const ConnectionCreateArgsSchema: z.ZodType<Omit<Prisma.ConnectionCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ConnectionCreateInputSchema,ConnectionUncheckedCreateInputSchema ]),
}).strict() ;

export default ConnectionCreateArgsSchema;
