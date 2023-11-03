import type { Prisma } from "../../client";
import { z } from "zod";
import { InputJsonValue } from "./InputJsonValue";

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z
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
  })
  .strict();

export default JsonFilterSchema;
