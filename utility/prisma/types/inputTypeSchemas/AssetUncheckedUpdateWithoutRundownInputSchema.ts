import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { EnumAssetTypeFieldUpdateOperationsInputSchema } from "./EnumAssetTypeFieldUpdateOperationsInputSchema";
import { LoadAssetJobUncheckedUpdateManyWithoutAssetNestedInputSchema } from "./LoadAssetJobUncheckedUpdateManyWithoutAssetNestedInputSchema";

export const AssetUncheckedUpdateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateWithoutRundownInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
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
      mediaId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      loadJobs: z
        .lazy(
          () => LoadAssetJobUncheckedUpdateManyWithoutAssetNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default AssetUncheckedUpdateWithoutRundownInputSchema;
