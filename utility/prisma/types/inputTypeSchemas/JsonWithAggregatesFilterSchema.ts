import type { Prisma } from "../../client";
import { z } from "zod";
import { InputJsonValue } from "./InputJsonValue";
import { NestedIntFilterSchema } from "./NestedIntFilterSchema";
import { NestedJsonFilterSchema } from "./NestedJsonFilterSchema";

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValue.optional(),
      path: z.string().array().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValue.optional().nullable(),
      array_starts_with: InputJsonValue.optional().nullable(),
      array_ends_with: InputJsonValue.optional().nullable(),
      lt: InputJsonValue.optional(),
      lte: InputJsonValue.optional(),
      gt: InputJsonValue.optional(),
      gte: InputJsonValue.optional(),
      not: InputJsonValue.optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonFilterSchema).optional(),
    })
    .strict();

export default JsonWithAggregatesFilterSchema;
