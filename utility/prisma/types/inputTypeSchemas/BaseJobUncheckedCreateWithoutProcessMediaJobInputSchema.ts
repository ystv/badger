import type { Prisma } from "../../client";
import { z } from "zod";
import { JobStateSchema } from "./JobStateSchema";
import { LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema";

export const BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema: z.ZodType<Prisma.BaseJobUncheckedCreateWithoutProcessMediaJobInput> =
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
      LoadAssetJob: z
        .lazy(
          () => LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema,
        )
        .optional(),
      DummyTestJob: z
        .lazy(
          () => DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema,
        )
        .optional(),
    })
    .strict();

export default BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema;
