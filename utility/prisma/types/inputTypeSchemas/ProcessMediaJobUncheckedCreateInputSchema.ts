import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const ProcessMediaJobUncheckedCreateInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      mediaId: z.number().int(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
      base_job_id: z.number().int(),
    })
    .strict();

export default ProcessMediaJobUncheckedCreateInputSchema;
