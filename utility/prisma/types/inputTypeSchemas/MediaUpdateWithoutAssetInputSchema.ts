import type { Prisma } from "../../client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { EnumMediaStateFieldUpdateOperationsInputSchema } from "./EnumMediaStateFieldUpdateOperationsInputSchema";
import { RundownItemUpdateOneWithoutMediaNestedInputSchema } from "./RundownItemUpdateOneWithoutMediaNestedInputSchema";
import { ContinuityItemUpdateOneWithoutMediaNestedInputSchema } from "./ContinuityItemUpdateOneWithoutMediaNestedInputSchema";
import { MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema } from "./MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema";
import { ProcessMediaJobUpdateManyWithoutMediaNestedInputSchema } from "./ProcessMediaJobUpdateManyWithoutMediaNestedInputSchema";

export const MediaUpdateWithoutAssetInputSchema: z.ZodType<Prisma.MediaUpdateWithoutAssetInput> =
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
      rundownItem: z
        .lazy(() => RundownItemUpdateOneWithoutMediaNestedInputSchema)
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
    })
    .strict();

export default MediaUpdateWithoutAssetInputSchema;
