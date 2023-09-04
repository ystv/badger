import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { EnumMediaFileSourceTypeWithAggregatesFilterSchema } from "./EnumMediaFileSourceTypeWithAggregatesFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";

export const ProcessMediaJobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProcessMediaJobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ProcessMediaJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ProcessMediaJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProcessMediaJobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ProcessMediaJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ProcessMediaJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      mediaId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      sourceType: z
        .union([
          z.lazy(() => EnumMediaFileSourceTypeWithAggregatesFilterSchema),
          z.lazy(() => MediaFileSourceTypeSchema),
        ])
        .optional(),
      source: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      base_job_id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default ProcessMediaJobScalarWhereWithAggregatesInputSchema;
