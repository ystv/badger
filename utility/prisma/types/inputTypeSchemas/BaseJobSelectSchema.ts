import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobArgsSchema } from "../outputTypeSchemas/ProcessMediaJobArgsSchema";
import { LoadAssetJobArgsSchema } from "../outputTypeSchemas/LoadAssetJobArgsSchema";
import { DummyTestJobArgsSchema } from "../outputTypeSchemas/DummyTestJobArgsSchema";

export const BaseJobSelectSchema: z.ZodType<Prisma.BaseJobSelect> = z
  .object({
    id: z.boolean().optional(),
    workerId: z.boolean().optional(),
    state: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    externalJobProvider: z.boolean().optional(),
    externalJobID: z.boolean().optional(),
    ProcessMediaJob: z
      .union([z.boolean(), z.lazy(() => ProcessMediaJobArgsSchema)])
      .optional(),
    LoadAssetJob: z
      .union([z.boolean(), z.lazy(() => LoadAssetJobArgsSchema)])
      .optional(),
    DummyTestJob: z
      .union([z.boolean(), z.lazy(() => DummyTestJobArgsSchema)])
      .optional(),
  })
  .strict();

export default BaseJobSelectSchema;
