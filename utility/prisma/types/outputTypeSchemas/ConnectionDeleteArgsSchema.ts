import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'

export const ConnectionDeleteArgsSchema: z.ZodType<Omit<Prisma.ConnectionDeleteArgs, "select" | "include">> = z.object({
  where: ConnectionWhereUniqueInputSchema,
}).strict() ;

export default ConnectionDeleteArgsSchema;
