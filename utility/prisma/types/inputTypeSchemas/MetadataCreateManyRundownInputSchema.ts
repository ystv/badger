import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataCreateManyRundownInputSchema: z.ZodType<Prisma.MetadataCreateManyRundownInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
    })
    .strict();

export default MetadataCreateManyRundownInputSchema;
