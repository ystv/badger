import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedEnumMediaFileSourceTypeFilterSchema } from "./NestedEnumMediaFileSourceTypeFilterSchema";

export const NestedEnumMediaFileSourceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMediaFileSourceTypeWithAggregatesFilter> =
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

export default NestedEnumMediaFileSourceTypeWithAggregatesFilterSchema;
