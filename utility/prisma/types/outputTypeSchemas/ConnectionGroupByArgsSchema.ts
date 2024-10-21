import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereInputSchema } from '../inputTypeSchemas/ConnectionWhereInputSchema'
import { ConnectionOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ConnectionOrderByWithAggregationInputSchema'
import { ConnectionScalarFieldEnumSchema } from '../inputTypeSchemas/ConnectionScalarFieldEnumSchema'
import { ConnectionScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ConnectionScalarWhereWithAggregatesInputSchema'

export const ConnectionGroupByArgsSchema: z.ZodType<Prisma.ConnectionGroupByArgs> = z.object({
  where: ConnectionWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionOrderByWithAggregationInputSchema.array(),ConnectionOrderByWithAggregationInputSchema ]).optional(),
  by: ConnectionScalarFieldEnumSchema.array(),
  having: ConnectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ConnectionGroupByArgsSchema;
