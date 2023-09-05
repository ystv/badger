import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";
import { StringNullableWithAggregatesFilterSchema } from "./StringNullableWithAggregatesFilterSchema";
import { EnumMediaStateWithAggregatesFilterSchema } from "./EnumMediaStateWithAggregatesFilterSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { IntNullableWithAggregatesFilterSchema } from "./IntNullableWithAggregatesFilterSchema";

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      rawPath: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      path: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaStateWithAggregatesFilterSchema),
          z.lazy(() => MediaStateSchema),
        ])
        .optional(),
      rundownItemID: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      continuityItemID: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export default MediaScalarWhereWithAggregatesInputSchema;
