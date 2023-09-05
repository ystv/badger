import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema } from "./EnumMediaFileSourceTypeFieldUpdateOperationsInputSchema";
import { StringFieldUpdateOperationsInputSchema } from "./StringFieldUpdateOperationsInputSchema";
import { MediaUpdateOneRequiredWithoutProcess_jobsNestedInputSchema } from "./MediaUpdateOneRequiredWithoutProcess_jobsNestedInputSchema";
import { BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema } from "./BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema";

export const ProcessMediaJobUpdateInputSchema: z.ZodType<Prisma.ProcessMediaJobUpdateInput> =
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
      media: z
        .lazy(() => MediaUpdateOneRequiredWithoutProcess_jobsNestedInputSchema)
        .optional(),
      base_job: z
        .lazy(
          () => BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export default ProcessMediaJobUpdateInputSchema;
