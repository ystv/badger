import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { EnumMediaStateFieldUpdateOperationsInputSchema } from "./EnumMediaStateFieldUpdateOperationsInputSchema";
import { RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema";
import { ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema";
import { ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema";
import { AssetUncheckedUpdateManyWithoutMediaNestedInputSchema } from "./AssetUncheckedUpdateManyWithoutMediaNestedInputSchema";

export const MediaUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutTasksInput> =
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
      rundownItems: z
        .lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      process_jobs: z
        .lazy(
          () => ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema,
        )
        .optional(),
      assets: z
        .lazy(() => AssetUncheckedUpdateManyWithoutMediaNestedInputSchema)
        .optional(),
    })
    .strict();

export default MediaUncheckedUpdateWithoutTasksInputSchema;
