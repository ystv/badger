import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema } from "./MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema";
import { ShowUpdateOneWithoutMetadataNestedInputSchema } from "./ShowUpdateOneWithoutMetadataNestedInputSchema";

export const MetadataUpdateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutRundownInput> =
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
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export default MetadataUpdateWithoutRundownInputSchema;
