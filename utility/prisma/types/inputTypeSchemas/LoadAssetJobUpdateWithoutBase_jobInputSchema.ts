import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { AssetUpdateOneRequiredWithoutLoadJobsNestedInputSchema } from "./AssetUpdateOneRequiredWithoutLoadJobsNestedInputSchema";

export const LoadAssetJobUpdateWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateWithoutBase_jobInput> =
  z
    .object({
      sourceType: z
        .union([
          z.lazy(() => MediaFileSourceTypeSchema),
          z.lazy(() => EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      source: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      asset: z
        .lazy(() => AssetUpdateOneRequiredWithoutLoadJobsNestedInputSchema)
        .optional(),
    })
    .strict();

export default LoadAssetJobUpdateWithoutBase_jobInputSchema;
