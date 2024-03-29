import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataUncheckedCreateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUncheckedCreateWithoutShowInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      fieldId: z.number().int(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export default MetadataUncheckedCreateWithoutShowInputSchema;
