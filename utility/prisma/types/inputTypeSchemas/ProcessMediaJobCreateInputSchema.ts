import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { MediaCreateNestedOneWithoutProcess_jobsInputSchema } from "./MediaCreateNestedOneWithoutProcess_jobsInputSchema";
import { BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema } from "./BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema";

export const ProcessMediaJobCreateInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      media: z.lazy(() => MediaCreateNestedOneWithoutProcess_jobsInputSchema),
      base_job: z.lazy(
        () => BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema,
      ),
    })
    .strict();

export default ProcessMediaJobCreateInputSchema;
