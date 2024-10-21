import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereInputSchema } from '../inputTypeSchemas/ConnectionWhereInputSchema'
import { ConnectionOrderByWithRelationInputSchema } from '../inputTypeSchemas/ConnectionOrderByWithRelationInputSchema'
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'

export const ConnectionAggregateArgsSchema: z.ZodType<Prisma.ConnectionAggregateArgs> = z.object({
  where: ConnectionWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionOrderByWithRelationInputSchema.array(),ConnectionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ConnectionAggregateArgsSchema;
