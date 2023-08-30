import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { EnumAssetTypeFieldUpdateOperationsInputSchema } from "./EnumAssetTypeFieldUpdateOperationsInputSchema";
import { MediaUpdateOneRequiredWithoutAssetNestedInputSchema } from "./MediaUpdateOneRequiredWithoutAssetNestedInputSchema";
import { RundownUpdateOneRequiredWithoutAssetsNestedInputSchema } from "./RundownUpdateOneRequiredWithoutAssetsNestedInputSchema";

export const AssetUpdateWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetUpdateWithoutLoadJobsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AssetTypeSchema),
          z.lazy(() => EnumAssetTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneRequiredWithoutAssetNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneRequiredWithoutAssetsNestedInputSchema)
        .optional(),
    })
    .strict();

export default AssetUpdateWithoutLoadJobsInputSchema;
