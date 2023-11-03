import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { MetadataFieldCreateNestedOneWithoutValuesInputSchema } from "./MetadataFieldCreateNestedOneWithoutValuesInputSchema";
import { RundownCreateNestedOneWithoutMetadataInputSchema } from "./RundownCreateNestedOneWithoutMetadataInputSchema";

export const MetadataCreateWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateWithoutShowInput> =
  z
    .object({
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export default MetadataCreateWithoutShowInputSchema;
