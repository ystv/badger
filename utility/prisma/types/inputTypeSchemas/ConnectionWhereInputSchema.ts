import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumConnectionTargetFilterSchema } from "./EnumConnectionTargetFilterSchema";
import { ConnectionTargetSchema } from "./ConnectionTargetSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { UserRelationFilterSchema } from "./UserRelationFilterSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const ConnectionWhereInputSchema: z.ZodType<Prisma.ConnectionWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ConnectionWhereInputSchema),
          z.lazy(() => ConnectionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ConnectionWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ConnectionWhereInputSchema),
          z.lazy(() => ConnectionWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      target: z
        .union([
          z.lazy(() => EnumConnectionTargetFilterSchema),
          z.lazy(() => ConnectionTargetSchema),
        ])
        .optional(),
      refreshToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export default ConnectionWhereInputSchema;
