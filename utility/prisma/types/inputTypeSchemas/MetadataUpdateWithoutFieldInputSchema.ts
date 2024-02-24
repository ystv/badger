import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { ShowUpdateOneWithoutMetadataNestedInputSchema } from "./ShowUpdateOneWithoutMetadataNestedInputSchema";
import { RundownUpdateOneWithoutMetadataNestedInputSchema } from "./RundownUpdateOneWithoutMetadataNestedInputSchema";
import { MediaUpdateOneWithoutMetadataNestedInputSchema } from "./MediaUpdateOneWithoutMetadataNestedInputSchema";

export const MetadataUpdateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutFieldInput> =
  z
    .object({
      value: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue])
        .optional(),
      show: z
        .lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema)
        .optional(),
    })
    .strict();

export default MetadataUpdateWithoutFieldInputSchema;
