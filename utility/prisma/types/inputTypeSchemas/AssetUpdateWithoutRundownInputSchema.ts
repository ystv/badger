import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { EnumAssetTypeFieldUpdateOperationsInputSchema } from "./EnumAssetTypeFieldUpdateOperationsInputSchema";
import { MediaUpdateOneRequiredWithoutAssetNestedInputSchema } from "./MediaUpdateOneRequiredWithoutAssetNestedInputSchema";
import { LoadAssetJobUpdateManyWithoutAssetNestedInputSchema } from "./LoadAssetJobUpdateManyWithoutAssetNestedInputSchema";

export const AssetUpdateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateWithoutRundownInput> =
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
      loadJobs: z
        .lazy(() => LoadAssetJobUpdateManyWithoutAssetNestedInputSchema)
        .optional(),
    })
    .strict();

export default AssetUpdateWithoutRundownInputSchema;
