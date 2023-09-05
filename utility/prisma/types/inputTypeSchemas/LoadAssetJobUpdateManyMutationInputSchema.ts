import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";

export const LoadAssetJobUpdateManyMutationInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateManyMutationInput> =
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
    })
    .strict();

export default LoadAssetJobUpdateManyMutationInputSchema;
