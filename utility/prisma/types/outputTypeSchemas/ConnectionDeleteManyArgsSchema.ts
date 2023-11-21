import { z } from "zod";
import type { Prisma } from "../../client";
import { ConnectionWhereInputSchema } from "../inputTypeSchemas/ConnectionWhereInputSchema";

export const ConnectionDeleteManyArgsSchema: z.ZodType<Prisma.ConnectionDeleteManyArgs> =
  z
    .object({
      where: ConnectionWhereInputSchema.optional(),
    })
    .strict();

export default ConnectionDeleteManyArgsSchema;
