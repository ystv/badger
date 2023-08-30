import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumMediaFileSourceTypeFilterSchema } from "./EnumMediaFileSourceTypeFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { AssetRelationFilterSchema } from "./AssetRelationFilterSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";
import { BaseJobRelationFilterSchema } from "./BaseJobRelationFilterSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const LoadAssetJobWhereInputSchema: z.ZodType<Prisma.LoadAssetJobWhereInput> =
  z
    .object({
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
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      sourceType: z
        .union([
          z.lazy(() => EnumMediaFileSourceTypeFilterSchema),
          z.lazy(() => MediaFileSourceTypeSchema),
        ])
        .optional(),
      source: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      asset_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      base_job_id: z
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
    .strict();

export default LoadAssetJobWhereInputSchema;
