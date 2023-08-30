import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumRundownItemTypeFilterSchema } from "./EnumRundownItemTypeFilterSchema";
import { RundownItemTypeSchema } from "./RundownItemTypeSchema";
import { MediaNullableRelationFilterSchema } from "./MediaNullableRelationFilterSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { RundownRelationFilterSchema } from "./RundownRelationFilterSchema";
import { RundownWhereInputSchema } from "./RundownWhereInputSchema";

export const RundownItemWhereUniqueInputSchema: z.ZodType<Prisma.RundownItemWhereUniqueInput> =
  z
    .object({
      id: z.number(),
    })
    .and(
      z
        .object({
          id: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => RundownItemWhereInputSchema),
              z.lazy(() => RundownItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RundownItemWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RundownItemWhereInputSchema),
              z.lazy(() => RundownItemWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          rundownId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumRundownItemTypeFilterSchema),
              z.lazy(() => RundownItemTypeSchema),
            ])
            .optional(),
          notes: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          media: z
            .union([
              z.lazy(() => MediaNullableRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional()
            .nullable(),
          rundown: z
            .union([
              z.lazy(() => RundownRelationFilterSchema),
              z.lazy(() => RundownWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export default RundownItemWhereUniqueInputSchema;
