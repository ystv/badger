import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const ProcessMediaJobUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.number().int().optional(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      base_job_id: z.number().int(),
    })
    .strict();

export default ProcessMediaJobUncheckedCreateWithoutMediaInputSchema;
