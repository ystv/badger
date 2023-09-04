import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";
import { ContinuityItemUpdateWithoutMediaInputSchema } from "./ContinuityItemUpdateWithoutMediaInputSchema";
import { ContinuityItemUncheckedUpdateWithoutMediaInputSchema } from "./ContinuityItemUncheckedUpdateWithoutMediaInputSchema";

export const ContinuityItemUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpdateToOneWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default ContinuityItemUpdateToOneWithWhereWithoutMediaInputSchema;
