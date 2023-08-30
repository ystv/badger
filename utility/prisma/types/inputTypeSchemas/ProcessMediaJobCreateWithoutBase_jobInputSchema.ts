import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { MediaCreateNestedOneWithoutProcess_jobsInputSchema } from "./MediaCreateNestedOneWithoutProcess_jobsInputSchema";

export const ProcessMediaJobCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobCreateWithoutBase_jobInput> =
  z
    .object({
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      media: z.lazy(() => MediaCreateNestedOneWithoutProcess_jobsInputSchema),
    })
    .strict();

export default ProcessMediaJobCreateWithoutBase_jobInputSchema;
