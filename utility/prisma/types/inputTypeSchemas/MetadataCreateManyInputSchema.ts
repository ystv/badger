import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataCreateManyInputSchema: z.ZodType<Prisma.MetadataCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      fieldId: z.number().int(),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
    })
    .strict();

export default MetadataCreateManyInputSchema;
