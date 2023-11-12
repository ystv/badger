import { z } from "zod";
import type { Prisma } from "../../client";
import { ConnectionUpdateManyMutationInputSchema } from "../inputTypeSchemas/ConnectionUpdateManyMutationInputSchema";
import { ConnectionUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/ConnectionUncheckedUpdateManyInputSchema";
import { ConnectionWhereInputSchema } from "../inputTypeSchemas/ConnectionWhereInputSchema";

export const ConnectionUpdateManyArgsSchema: z.ZodType<Prisma.ConnectionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ConnectionUpdateManyMutationInputSchema,
        ConnectionUncheckedUpdateManyInputSchema,
      ]),
      where: ConnectionWhereInputSchema.optional(),
    })
    .strict();

export default ConnectionUpdateManyArgsSchema;
