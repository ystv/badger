import type { Prisma } from "../../client";
import { z } from "zod";
import { JobStateSchema } from "./JobStateSchema";
import { ProcessMediaJobUncheckedCreateNestedOneWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateNestedOneWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema";

export const BaseJobUncheckedCreateWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobUncheckedCreateWithoutDummyTestJobInput> =
  z
    .object({
      id: z.number().int().optional(),
      workerId: z.string().optional().nullable(),
      state: z.lazy(() => JobStateSchema).optional(),
      createdAt: z.coerce.date().optional(),
      startedAt: z.coerce.date().optional().nullable(),
      completedAt: z.coerce.date().optional().nullable(),
      externalJobProvider: z.string().optional().nullable(),
      externalJobID: z.string().optional().nullable(),
      ProcessMediaJob: z
        .lazy(
          () =>
            ProcessMediaJobUncheckedCreateNestedOneWithoutBase_jobInputSchema,
        )
        .optional(),
      LoadAssetJob: z
        .lazy(
          () => LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema,
        )
        .optional(),
    })
    .strict();

export default BaseJobUncheckedCreateWithoutDummyTestJobInputSchema;
