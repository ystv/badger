import type { Prisma } from "../../client";
import { z } from "zod";
import { NullableStringFieldUpdateOperationsInputSchema } from "./NullableStringFieldUpdateOperationsInputSchema";
import { JobStateSchema } from "./JobStateSchema";
import { EnumJobStateFieldUpdateOperationsInputSchema } from "./EnumJobStateFieldUpdateOperationsInputSchema";
import { DateTimeFieldUpdateOperationsInputSchema } from "./DateTimeFieldUpdateOperationsInputSchema";
import { NullableDateTimeFieldUpdateOperationsInputSchema } from "./NullableDateTimeFieldUpdateOperationsInputSchema";
import { ProcessMediaJobUpdateOneWithoutBase_jobNestedInputSchema } from "./ProcessMediaJobUpdateOneWithoutBase_jobNestedInputSchema";
import { LoadAssetJobUpdateOneWithoutBase_jobNestedInputSchema } from "./LoadAssetJobUpdateOneWithoutBase_jobNestedInputSchema";

export const BaseJobUpdateWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobUpdateWithoutDummyTestJobInput> =
  z
    .object({
      workerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => JobStateSchema),
          z.lazy(() => EnumJobStateFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      externalJobProvider: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      ProcessMediaJob: z
        .lazy(() => ProcessMediaJobUpdateOneWithoutBase_jobNestedInputSchema)
        .optional(),
      LoadAssetJob: z
        .lazy(() => LoadAssetJobUpdateOneWithoutBase_jobNestedInputSchema)
        .optional(),
    })
    .strict();

export default BaseJobUpdateWithoutDummyTestJobInputSchema;
