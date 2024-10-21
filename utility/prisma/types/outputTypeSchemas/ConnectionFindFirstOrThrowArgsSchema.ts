import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereInputSchema } from '../inputTypeSchemas/ConnectionWhereInputSchema'
import { ConnectionOrderByWithRelationInputSchema } from '../inputTypeSchemas/ConnectionOrderByWithRelationInputSchema'
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'
import { ConnectionScalarFieldEnumSchema } from '../inputTypeSchemas/ConnectionScalarFieldEnumSchema'

export const ConnectionFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.ConnectionFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: ConnectionWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionOrderByWithRelationInputSchema.array(),ConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConnectionScalarFieldEnumSchema,ConnectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ConnectionFindFirstOrThrowArgsSchema;
