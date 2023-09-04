import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetUpdateWithoutMediaInputSchema } from "./AssetUpdateWithoutMediaInputSchema";
import { AssetUncheckedUpdateWithoutMediaInputSchema } from "./AssetUncheckedUpdateWithoutMediaInputSchema";
import { AssetCreateWithoutMediaInputSchema } from "./AssetCreateWithoutMediaInputSchema";
import { AssetUncheckedCreateWithoutMediaInputSchema } from "./AssetUncheckedCreateWithoutMediaInputSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const AssetUpsertWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpsertWithoutMediaInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => AssetUpdateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AssetCreateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
      ]),
      where: z.lazy(() => AssetWhereInputSchema).optional(),
    })
    .strict();

export default AssetUpsertWithoutMediaInputSchema;
