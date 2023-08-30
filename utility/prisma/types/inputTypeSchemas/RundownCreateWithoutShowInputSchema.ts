import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from "./RundownItemCreateNestedManyWithoutRundownInputSchema";
import { AssetCreateNestedManyWithoutRundownInputSchema } from "./AssetCreateNestedManyWithoutRundownInputSchema";

export const RundownCreateWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateWithoutShowInput> =
  z
    .object({
      name: z.string(),
      order: z.number().int(),
      items: z
        .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
        .optional(),
      assets: z
        .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
        .optional(),
    })
    .strict();

export default RundownCreateWithoutShowInputSchema;
