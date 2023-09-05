import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { EnumMediaFileSourceTypeWithAggregatesFilterSchema } from "./EnumMediaFileSourceTypeWithAggregatesFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringWithAggregatesFilterSchema } from "./StringWithAggregatesFilterSchema";

export const LoadAssetJobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LoadAssetJobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LoadAssetJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => LoadAssetJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LoadAssetJobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LoadAssetJobScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => LoadAssetJobScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
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
      asset_id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      base_job_id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default LoadAssetJobScalarWhereWithAggregatesInputSchema;
