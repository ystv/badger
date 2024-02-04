import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { MetadataFieldCreateNestedOneWithoutValuesInputSchema } from "./MetadataFieldCreateNestedOneWithoutValuesInputSchema";
import { ShowCreateNestedOneWithoutMetadataInputSchema } from "./ShowCreateNestedOneWithoutMetadataInputSchema";
import { RundownCreateNestedOneWithoutMetadataInputSchema } from "./RundownCreateNestedOneWithoutMetadataInputSchema";
import { MediaCreateNestedOneWithoutMetadataInputSchema } from "./MediaCreateNestedOneWithoutMetadataInputSchema";

export const MetadataCreateInputSchema: z.ZodType<Prisma.MetadataCreateInput> =
  z
    .object({
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export default MetadataCreateInputSchema;
