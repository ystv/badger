import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema } from "./MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema";
import { RundownUpdateOneWithoutMetadataNestedInputSchema } from "./RundownUpdateOneWithoutMetadataNestedInputSchema";

export const MetadataUpdateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutShowInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue])
        .optional(),
      field: z
        .lazy(
          () => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema,
        )
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export default MetadataUpdateWithoutShowInputSchema;
