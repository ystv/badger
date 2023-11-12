import type { Prisma } from "../../client";
import { z } from "zod";
import { ConnectionUserIdTargetCompoundUniqueInputSchema } from "./ConnectionUserIdTargetCompoundUniqueInputSchema";
import { ConnectionWhereInputSchema } from "./ConnectionWhereInputSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumConnectionTargetFilterSchema } from "./EnumConnectionTargetFilterSchema";
import { ConnectionTargetSchema } from "./ConnectionTargetSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { UserRelationFilterSchema } from "./UserRelationFilterSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const ConnectionWhereUniqueInputSchema: z.ZodType<Prisma.ConnectionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number(),
        userId_target: z.lazy(
          () => ConnectionUserIdTargetCompoundUniqueInputSchema,
        ),
      }),
      z.object({
        id: z.number(),
      }),
      z.object({
        userId_target: z.lazy(
          () => ConnectionUserIdTargetCompoundUniqueInputSchema,
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().optional(),
          userId_target: z
            .lazy(() => ConnectionUserIdTargetCompoundUniqueInputSchema)
            .optional(),
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
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
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
        .strict(),
    );

export default ConnectionWhereUniqueInputSchema;
