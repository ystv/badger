import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema } from "./BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema";

export const ProcessMediaJobCreateWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateWithoutMediaInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      base_job: z.lazy(
        () => BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema,
      ),
    })
    .strict();

export default ProcessMediaJobCreateWithoutMediaInputSchema;
