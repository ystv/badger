import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemUpdateWithoutMediaInputSchema } from "./RundownItemUpdateWithoutMediaInputSchema";
import { RundownItemUncheckedUpdateWithoutMediaInputSchema } from "./RundownItemUncheckedUpdateWithoutMediaInputSchema";
import { RundownItemCreateWithoutMediaInputSchema } from "./RundownItemCreateWithoutMediaInputSchema";
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from "./RundownItemUncheckedCreateWithoutMediaInputSchema";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";

export const RundownItemUpsertWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpsertWithoutMediaInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
        z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
      ]),
      where: z.lazy(() => RundownItemWhereInputSchema).optional(),
    })
    .strict();

export default RundownItemUpsertWithoutMediaInputSchema;
