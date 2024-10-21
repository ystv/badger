import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionWhereUniqueInputSchema } from '../inputTypeSchemas/ConnectionWhereUniqueInputSchema'

export const ConnectionFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ConnectionFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ConnectionWhereUniqueInputSchema,
}).strict() ;

export default ConnectionFindUniqueOrThrowArgsSchema;
