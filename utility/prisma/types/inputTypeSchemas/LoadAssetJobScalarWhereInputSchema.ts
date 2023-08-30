import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumMediaFileSourceTypeFilterSchema } from "./EnumMediaFileSourceTypeFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringFilterSchema } from "./StringFilterSchema";

export const LoadAssetJobScalarWhereInputSchema: z.ZodType<Prisma.LoadAssetJobScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LoadAssetJobScalarWhereInputSchema),
          z.lazy(() => LoadAssetJobScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LoadAssetJobScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LoadAssetJobScalarWhereInputSchema),
          z.lazy(() => LoadAssetJobScalarWhereInputSchema).array(),
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
    })
    .strict();

export default LoadAssetJobScalarWhereInputSchema;
