import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";

export const DummyTestJobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DummyTestJobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DummyTestJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => DummyTestJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DummyTestJobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DummyTestJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => DummyTestJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      baseJobId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default DummyTestJobScalarWhereWithAggregatesInputSchema;
