import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionUpdateInputSchema } from '../inputTypeSchemas/ConnectionUpdateInputSchema'
import { ConnectionUncheckedUpdateInputSchema } from '../inputTypeSchemas/ConnectionUncheckedUpdateInputSchema'
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'

export const ConnectionUpdateArgsSchema: z.ZodType<Omit<Prisma.ConnectionUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ConnectionUpdateInputSchema,ConnectionUncheckedUpdateInputSchema ]),
  where: ConnectionWhereUniqueInputSchema,
}).strict() ;

export default ConnectionUpdateArgsSchema;
