import type { Prisma } from "../../client";
import { z } from "zod";
import { JobStateSchema } from "./JobStateSchema";
import { ProcessMediaJobCreateNestedOneWithoutBase_jobInputSchema } from "./ProcessMediaJobCreateNestedOneWithoutBase_jobInputSchema";
import { DummyTestJobCreateNestedOneWithoutBase_jobInputSchema } from "./DummyTestJobCreateNestedOneWithoutBase_jobInputSchema";

export const BaseJobCreateWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobCreateWithoutLoadAssetJobInput> =
  z
    .object({
      workerId: z.string().optional().nullable(),
      state: z.lazy(() => JobStateSchema).optional(),
      createdAt: z.coerce.date().optional(),
      startedAt: z.coerce.date().optional().nullable(),
      completedAt: z.coerce.date().optional().nullable(),
      externalJobProvider: z.string().optional().nullable(),
      externalJobID: z.string().optional().nullable(),
      ProcessMediaJob: z
        .lazy(() => ProcessMediaJobCreateNestedOneWithoutBase_jobInputSchema)
        .optional(),
      DummyTestJob: z
        .lazy(() => DummyTestJobCreateNestedOneWithoutBase_jobInputSchema)
        .optional(),
    })
    .strict();

export default BaseJobCreateWithoutLoadAssetJobInputSchema;
