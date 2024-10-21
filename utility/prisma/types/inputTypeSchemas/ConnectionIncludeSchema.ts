import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const ConnectionIncludeSchema: z.ZodType<Prisma.ConnectionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default ConnectionIncludeSchema;
