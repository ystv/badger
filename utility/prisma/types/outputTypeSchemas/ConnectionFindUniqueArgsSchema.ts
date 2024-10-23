import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'

export const ConnectionFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ConnectionFindUniqueArgs, "select" | "include">> = z.object({
  where: ConnectionWhereUniqueInputSchema,
}).strict() ;

export default ConnectionFindUniqueArgsSchema;
