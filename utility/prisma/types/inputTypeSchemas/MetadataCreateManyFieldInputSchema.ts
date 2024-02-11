import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataCreateManyFieldInputSchema: z.ZodType<Prisma.MetadataCreateManyFieldInput> =
  z
    .object({
      id: z.number().int().optional(),
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      showId: z.number().int().optional().nullable(),
      rundownId: z.number().int().optional().nullable(),
      mediaId: z.number().int().optional().nullable(),
    })
    .strict();

export default MetadataCreateManyFieldInputSchema;
