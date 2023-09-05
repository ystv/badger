import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";
import { RundownItemUpdateWithoutMediaInputSchema } from "./RundownItemUpdateWithoutMediaInputSchema";
import { RundownItemUncheckedUpdateWithoutMediaInputSchema } from "./RundownItemUncheckedUpdateWithoutMediaInputSchema";

export const RundownItemUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateToOneWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => RundownItemWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default RundownItemUpdateToOneWithWhereWithoutMediaInputSchema;
