import { z } from "zod";
import type { Prisma } from "../../client";
import { IdentityFindManyArgsSchema } from "../outputTypeSchemas/IdentityFindManyArgsSchema";
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema";

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    identities: z
      .union([z.boolean(), z.lazy(() => IdentityFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default UserIncludeSchema;
