import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { AssetTypeSchema } from "./AssetTypeSchema";
import { EnumAssetTypeFieldUpdateOperationsInputSchema } from "./EnumAssetTypeFieldUpdateOperationsInputSchema";

export const AssetUpdateManyMutationInputSchema: z.ZodType<Prisma.AssetUpdateManyMutationInput> =
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
    })
    .strict();

export default AssetUpdateManyMutationInputSchema;
