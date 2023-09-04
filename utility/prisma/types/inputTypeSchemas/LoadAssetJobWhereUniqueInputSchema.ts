import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";
import { EnumMediaFileSourceTypeFilterSchema } from "./EnumMediaFileSourceTypeFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { AssetRelationFilterSchema } from "./AssetRelationFilterSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";
import { BaseJobRelationFilterSchema } from "./BaseJobRelationFilterSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const LoadAssetJobWhereUniqueInputSchema: z.ZodType<Prisma.LoadAssetJobWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number(),
        base_job_id: z.number(),
      }),
      z.object({
        id: z.number(),
      }),
      z.object({
        base_job_id: z.number(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().optional(),
          base_job_id: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => LoadAssetJobWhereInputSchema),
              z.lazy(() => LoadAssetJobWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => LoadAssetJobWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => LoadAssetJobWhereInputSchema),
              z.lazy(() => LoadAssetJobWhereInputSchema).array(),
            ])
            .optional(),
          sourceType: z
            .union([
              z.lazy(() => EnumMediaFileSourceTypeFilterSchema),
              z.lazy(() => MediaFileSourceTypeSchema),
            ])
            .optional(),
          source: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          asset_id: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          asset: z
            .union([
              z.lazy(() => AssetRelationFilterSchema),
              z.lazy(() => AssetWhereInputSchema),
            ])
            .optional(),
          base_job: z
            .union([
              z.lazy(() => BaseJobRelationFilterSchema),
              z.lazy(() => BaseJobWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export default LoadAssetJobWhereUniqueInputSchema;
