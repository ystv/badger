import { z } from 'zod';
import type { Prisma } from '../../client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const IdentityIncludeSchema: z.ZodType<Prisma.IdentityInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default IdentityIncludeSchema;
