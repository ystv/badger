import type { Prisma } from "../../client";
import { z } from "zod";
import { JobStateSchema } from "./JobStateSchema";
import { ProcessMediaJobUncheckedCreateNestedOneWithoutBase_jobInputSchema } from "./ProcessMediaJobUncheckedCreateNestedOneWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema";

export const BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobUncheckedCreateWithoutLoadAssetJobInput> =
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
      DummyTestJob: z
        .lazy(
          () => DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema,
        )
        .optional(),
    })
    .strict();

export default BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema;
