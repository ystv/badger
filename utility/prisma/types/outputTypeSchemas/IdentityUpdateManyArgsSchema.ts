import { z } from "zod";
import type { Prisma } from "../../client";
import { IdentityUpdateManyMutationInputSchema } from "../inputTypeSchemas/IdentityUpdateManyMutationInputSchema";
import { IdentityUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/IdentityUncheckedUpdateManyInputSchema";
import { IdentityWhereInputSchema } from "../inputTypeSchemas/IdentityWhereInputSchema";

export const IdentityUpdateManyArgsSchema: z.ZodType<Prisma.IdentityUpdateManyArgs> =
  z
    .object({
      data: z.union([
        IdentityUpdateManyMutationInputSchema,
        IdentityUncheckedUpdateManyInputSchema,
      ]),
      where: IdentityWhereInputSchema.optional(),
    })
    .strict();

export default IdentityUpdateManyArgsSchema;
