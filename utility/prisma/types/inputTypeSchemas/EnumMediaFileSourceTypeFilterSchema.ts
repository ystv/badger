import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { NestedEnumMediaFileSourceTypeFilterSchema } from "./NestedEnumMediaFileSourceTypeFilterSchema";

export const EnumMediaFileSourceTypeFilterSchema: z.ZodType<Prisma.EnumMediaFileSourceTypeFilter> =
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
          z.lazy(() => NestedEnumMediaFileSourceTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export default EnumMediaFileSourceTypeFilterSchema;
