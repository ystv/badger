import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const NestedEnumMediaFileSourceTypeFilterSchema: z.ZodType<Prisma.NestedEnumMediaFileSourceTypeFilter> =
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

export default NestedEnumMediaFileSourceTypeFilterSchema;
