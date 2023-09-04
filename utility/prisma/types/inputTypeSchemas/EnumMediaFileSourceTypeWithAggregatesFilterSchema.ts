import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { NestedEnumMediaFileSourceTypeWithAggregatesFilterSchema } from "./NestedEnumMediaFileSourceTypeWithAggregatesFilterSchema";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedEnumMediaFileSourceTypeFilterSchema } from "./NestedEnumMediaFileSourceTypeFilterSchema";

export const EnumMediaFileSourceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMediaFileSourceTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => MediaFileSourceTypeSchema).optional(),
      in: z
        .lazy(() => MediaFileSourceTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => MediaFileSourceTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => MediaFileSourceTypeSchema),
          z.lazy(() => NestedEnumMediaFileSourceTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumMediaFileSourceTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumMediaFileSourceTypeFilterSchema).optional(),
    })
    .strict();

export default EnumMediaFileSourceTypeWithAggregatesFilterSchema;
