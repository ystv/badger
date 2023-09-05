import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { MediaNullableRelationFilterSchema } from "./MediaNullableRelationFilterSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { ShowRelationFilterSchema } from "./ShowRelationFilterSchema";
import { ShowWhereInputSchema } from "./ShowWhereInputSchema";

export const ContinuityItemWhereInputSchema: z.ZodType<Prisma.ContinuityItemWhereInput> =
  z
    .object({
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
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
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
    .strict();

export default ContinuityItemWhereInputSchema;
