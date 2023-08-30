import type { Prisma } from "../../client";
import { z } from "zod";
import { ShowCreateNestedOneWithoutRundownsInputSchema } from "./ShowCreateNestedOneWithoutRundownsInputSchema";
import { RundownItemCreateNestedManyWithoutRundownInputSchema } from "./RundownItemCreateNestedManyWithoutRundownInputSchema";
import { AssetCreateNestedManyWithoutRundownInputSchema } from "./AssetCreateNestedManyWithoutRundownInputSchema";

export const RundownCreateInputSchema: z.ZodType<Prisma.RundownCreateInput> = z
  .object({
    name: z.string(),
    order: z.number().int(),
    show: z.lazy(() => ShowCreateNestedOneWithoutRundownsInputSchema),
    items: z
      .lazy(() => RundownItemCreateNestedManyWithoutRundownInputSchema)
      .optional(),
    assets: z
      .lazy(() => AssetCreateNestedManyWithoutRundownInputSchema)
      .optional(),
  })
  .strict();

export default RundownCreateInputSchema;
