import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'
import { ConnectionCreateInputSchema } from '../inputTypeSchemas/ConnectionCreateInputSchema'
import { ConnectionUncheckedCreateInputSchema } from '../inputTypeSchemas/ConnectionUncheckedCreateInputSchema'
import { ConnectionUpdateInputSchema } from '../inputTypeSchemas/ConnectionUpdateInputSchema'
import { ConnectionUncheckedUpdateInputSchema } from '../inputTypeSchemas/ConnectionUncheckedUpdateInputSchema'

export const ConnectionUpsertArgsSchema: z.ZodType<Omit<Prisma.ConnectionUpsertArgs, "select" | "include">> = z.object({
  where: ConnectionWhereUniqueInputSchema,
  create: z.union([ ConnectionCreateInputSchema,ConnectionUncheckedCreateInputSchema ]),
  update: z.union([ ConnectionUpdateInputSchema,ConnectionUncheckedUpdateInputSchema ]),
}).strict() ;

export default ConnectionUpsertArgsSchema;
