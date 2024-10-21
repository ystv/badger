import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const ConnectionSelectSchema: z.ZodType<Prisma.ConnectionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  target: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default ConnectionSelectSchema;
