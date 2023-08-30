import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { EnumMediaStateFieldUpdateOperationsInputSchema } from "./EnumMediaStateFieldUpdateOperationsInputSchema";
import { NullableIntFieldUpdateOperationsInputSchema } from "./NullableIntFieldUpdateOperationsInputSchema";
import { MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema";
import { ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema";

export const MediaUncheckedUpdateWithoutAssetInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutAssetInput> =
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
      rundownItemID: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      continuityItemID: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      process_jobs: z
        .lazy(
          () => ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default MediaUncheckedUpdateWithoutAssetInputSchema;
