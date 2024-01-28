import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";

export const MetadataUpdateManyMutationInputSchema: z.ZodType<Prisma.MetadataUpdateManyMutationInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue])
        .optional(),
    })
    .strict();

export default MetadataUpdateManyMutationInputSchema;
