import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { EnumMediaStateFieldUpdateOperationsInputSchema } from "./EnumMediaStateFieldUpdateOperationsInputSchema";
import { ContinuityItemUpdateOneWithoutMediaNestedInputSchema } from "./ContinuityItemUpdateOneWithoutMediaNestedInputSchema";
import { MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema } from "./MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema";
import { ProcessMediaJobUpdateManyWithoutMediaNestedInputSchema } from "./ProcessMediaJobUpdateManyWithoutMediaNestedInputSchema";
import { AssetUpdateOneWithoutMediaNestedInputSchema } from "./AssetUpdateOneWithoutMediaNestedInputSchema";

export const MediaUpdateWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaUpdateWithoutRundownItemInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rawPath: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      durationSeconds: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.lazy(() => MediaStateSchema),
          z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      continuityItem: z
        .lazy(() => ContinuityItemUpdateOneWithoutMediaNestedInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      process_jobs: z
        .lazy(() => ProcessMediaJobUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      asset: z
        .lazy(() => AssetUpdateOneWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export default MediaUpdateWithoutRundownItemInputSchema;
