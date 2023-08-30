import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { EnumAssetTypeFilterSchema } from "./EnumAssetTypeFilterSchema";
import { AssetTypeSchema } from "./AssetTypeSchema";

export const AssetScalarWhereInputSchema: z.ZodType<Prisma.AssetScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AssetScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AssetScalarWhereInputSchema),
          z.lazy(() => AssetScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      type: z
        .union([
          z.lazy(() => EnumAssetTypeFilterSchema),
          z.lazy(() => AssetTypeSchema),
        ])
        .optional(),
      rundownId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      mediaId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export default AssetScalarWhereInputSchema;
