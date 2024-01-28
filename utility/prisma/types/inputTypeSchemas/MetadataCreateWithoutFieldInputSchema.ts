import type { Prisma } from "../../client";
import { z } from "zod";
import { JsonNullValueInputSchema } from "./JsonNullValueInputSchema";
import { InputJsonValue } from "./InputJsonValue";
import { ShowCreateNestedOneWithoutMetadataInputSchema } from "./ShowCreateNestedOneWithoutMetadataInputSchema";
import { RundownCreateNestedOneWithoutMetadataInputSchema } from "./RundownCreateNestedOneWithoutMetadataInputSchema";

export const MetadataCreateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateWithoutFieldInput> =
  z
    .object({
      value: z.union([z.lazy(() => JsonNullValueInputSchema), InputJsonValue]),
      show: z
        .lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
      rundown: z
        .lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema)
        .optional(),
    })
    .strict();

export default MetadataCreateWithoutFieldInputSchema;
