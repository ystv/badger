import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentityFindManyArgsSchema } from "../outputTypeSchemas/IdentityFindManyArgsSchema"
import { ConnectionFindManyArgsSchema } from "../outputTypeSchemas/ConnectionFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  identities: z.union([z.boolean(),z.lazy(() => IdentityFindManyArgsSchema)]).optional(),
  connections: z.union([z.boolean(),z.lazy(() => ConnectionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserIncludeSchema;
