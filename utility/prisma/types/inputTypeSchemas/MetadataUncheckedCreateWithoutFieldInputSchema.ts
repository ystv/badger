import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataUncheckedCreateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutFieldInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export default MetadataUncheckedCreateWithoutFieldInputSchema;
