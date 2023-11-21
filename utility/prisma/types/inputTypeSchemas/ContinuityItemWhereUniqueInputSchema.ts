import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { IntNullableFilterSchema } from "./IntNullableFilterSchema";
import { MediaNullableRelationFilterSchema } from "./MediaNullableRelationFilterSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { ShowRelationFilterSchema } from "./ShowRelationFilterSchema";
import { ShowWhereInputSchema } from "./ShowWhereInputSchema";

export const ContinuityItemWhereUniqueInputSchema: z.ZodType<Prisma.ContinuityItemWhereUniqueInput> =
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
              z.lazy(() => ContinuityItemWhereInputSchema),
              z.lazy(() => ContinuityItemWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ContinuityItemWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ContinuityItemWhereInputSchema),
              z.lazy(() => ContinuityItemWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          showId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          ytBroadcastID: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          mediaId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number()])
            .optional()
            .nullable(),
          media: z
            .union([
              z.lazy(() => MediaNullableRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional()
            .nullable(),
          show: z
            .union([
              z.lazy(() => ShowRelationFilterSchema),
              z.lazy(() => ShowWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export default ContinuityItemWhereUniqueInputSchema;
