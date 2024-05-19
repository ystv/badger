import type { Prisma } from "../../client";
import { z } from "zod";
import { JobStateSchema } from "./JobStateSchema";
import { JobTypeSchema } from "./JobTypeSchema";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const BaseJobUncheckedCreateInputSchema: z.ZodType<Prisma.BaseJobUncheckedCreateInput> =
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
      jobType: z.lazy(() => JobTypeSchema),
      jobPayload: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValue,
      ]),
    })
    .strict();

export default BaseJobUncheckedCreateInputSchema;
