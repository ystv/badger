import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemUpdateWithoutMediaInputSchema } from "./ContinuityItemUpdateWithoutMediaInputSchema";
import { ContinuityItemUncheckedUpdateWithoutMediaInputSchema } from "./ContinuityItemUncheckedUpdateWithoutMediaInputSchema";
import { ContinuityItemCreateWithoutMediaInputSchema } from "./ContinuityItemCreateWithoutMediaInputSchema";
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from "./ContinuityItemUncheckedCreateWithoutMediaInputSchema";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";

export const ContinuityItemUpsertWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUpsertWithoutMediaInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
        z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
      ]),
      where: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
    })
    .strict();

export default ContinuityItemUpsertWithoutMediaInputSchema;
