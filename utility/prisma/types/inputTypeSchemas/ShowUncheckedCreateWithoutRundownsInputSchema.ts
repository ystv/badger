import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema } from "./ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema";
import { MetadataUncheckedCreateNestedManyWithoutShowInputSchema } from "./MetadataUncheckedCreateNestedManyWithoutShowInputSchema";

export const ShowUncheckedCreateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutRundownsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      start: z.coerce.date(),
      version: z.number().int().optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema,
        )
        .optional(),
      metadata: z
        .lazy(() => MetadataUncheckedCreateNestedManyWithoutShowInputSchema)
        .optional(),
    })
    .strict();

export default ShowUncheckedCreateWithoutRundownsInputSchema;
