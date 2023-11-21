import type { Prisma } from "../../client";
import { z } from "zod";
import { ConnectionTargetSchema } from "./ConnectionTargetSchema";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedEnumConnectionTargetFilterSchema } from "./NestedEnumConnectionTargetFilterSchema";

export const NestedEnumConnectionTargetWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTargetWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ConnectionTargetSchema).optional(),
      in: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ConnectionTargetSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ConnectionTargetSchema),
          z.lazy(() => NestedEnumConnectionTargetWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumConnectionTargetFilterSchema).optional(),
    })
    .strict();

export default NestedEnumConnectionTargetWithAggregatesFilterSchema;
