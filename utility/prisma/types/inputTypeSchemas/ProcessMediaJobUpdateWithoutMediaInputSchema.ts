import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema } from "./BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema";

export const ProcessMediaJobUpdateWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUpdateWithoutMediaInput> =
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
          () => BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default ProcessMediaJobUpdateWithoutMediaInputSchema;
