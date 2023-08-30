import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";

export const RundownScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RundownScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RundownScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RundownScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      showId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      order: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default RundownScalarWhereWithAggregatesInputSchema;
