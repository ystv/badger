import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInputSchema } from "./BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInputSchema";

export const LoadAssetJobUpdateWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateWithoutAssetInput> =
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
      base_job: z
        .lazy(
          () => BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default LoadAssetJobUpdateWithoutAssetInputSchema;
