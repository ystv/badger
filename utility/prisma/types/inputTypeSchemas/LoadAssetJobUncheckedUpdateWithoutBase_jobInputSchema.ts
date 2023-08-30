import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";

export const LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUncheckedUpdateWithoutBase_jobInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
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
      asset_id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema;
