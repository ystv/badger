import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetTypeSchema } from "./AssetTypeSchema";

export const EnumAssetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAssetTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => AssetTypeSchema).optional(),
    })
    .strict();

export default EnumAssetTypeFieldUpdateOperationsInputSchema;
