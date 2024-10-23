import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityFindManyArgsSchema } from "../outputTypeSchemas/IdentityFindManyArgsSchema"
import { ConnectionFindManyArgsSchema } from "../outputTypeSchemas/ConnectionFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  isActive: z.boolean().optional(),
  permissions: z.boolean().optional(),
  identities: z.union([z.boolean(),z.lazy(() => IdentityFindManyArgsSchema)]).optional(),
  connections: z.union([z.boolean(),z.lazy(() => ConnectionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserSelectSchema;
