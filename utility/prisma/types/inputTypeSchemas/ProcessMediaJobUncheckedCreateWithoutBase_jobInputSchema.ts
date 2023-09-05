import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";

export const ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedCreateWithoutBase_jobInput> =
  z
    .object({
      id: z.number().int().optional(),
      mediaId: z.number().int(),
      sourceType: z.lazy(() => MediaFileSourceTypeSchema),
      source: z.string(),
    })
    .strict();

export default ProcessMediaJobUncheckedCreateWithoutBase_jobInputSchema;
