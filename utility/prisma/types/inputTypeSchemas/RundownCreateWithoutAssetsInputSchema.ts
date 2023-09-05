import type { Prisma } from "../../client";
import { z } from "zod";
import { ShowCreateNestedOneWithoutRundownsInputSchema } from "./ShowCreateNestedOneWithoutRundownsInputSchema";
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from "./RundownItemCreateNestedManyWithoutRundownInputSchema";

export const RundownCreateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownCreateWithoutAssetsInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
      items: z
        .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export default RundownCreateWithoutAssetsInputSchema;
