import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { MetadataFieldCreateNestedOneWithoutValuesInputSchema } from "./MetadataFieldCreateNestedOneWithoutValuesInputSchema";
import { ShowCreateNestedOneWithoutMetadataInputSchema } from "./ShowCreateNestedOneWithoutMetadataInputSchema";
import { RundownCreateNestedOneWithoutMetadataInputSchema } from "./RundownCreateNestedOneWithoutMetadataInputSchema";

export const MetadataCreateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataCreateWithoutMediaInput> =
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
    })
    .strict();

export default MetadataCreateWithoutMediaInputSchema;
