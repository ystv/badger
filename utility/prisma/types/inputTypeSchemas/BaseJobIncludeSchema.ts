import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobArgsSchema } from "../outputTypeSchemas/ProcessMediaJobArgsSchema";
import { LoadAssetJobArgsSchema } from "../outputTypeSchemas/LoadAssetJobArgsSchema";
import { DummyTestJobFindManyArgsSchema } from "../outputTypeSchemas/DummyTestJobFindManyArgsSchema";
import { BaseJobCountOutputTypeArgsSchema } from "../outputTypeSchemas/BaseJobCountOutputTypeArgsSchema";

export const BaseJobIncludeSchema: z.ZodType<Prisma.BaseJobInclude> = z
  .object({
    ProcessMediaJob: z
      .union([z.boolean(), z.lazy(() => ProcessMediaJobArgsSchema)])
      .optional(),
    LoadAssetJob: z
      .union([z.boolean(), z.lazy(() => LoadAssetJobArgsSchema)])
      .optional(),
    DummyTestJob: z
      .union([z.boolean(), z.lazy(() => DummyTestJobFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => BaseJobCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default BaseJobIncludeSchema;
