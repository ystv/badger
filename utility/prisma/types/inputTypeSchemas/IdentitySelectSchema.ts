import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const IdentitySelectSchema: z.ZodType<Prisma.IdentitySelect> = z.object({
  id: z.boolean().optional(),
  provider: z.boolean().optional(),
  identityID: z.boolean().optional(),
  userID: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default IdentitySelectSchema;
