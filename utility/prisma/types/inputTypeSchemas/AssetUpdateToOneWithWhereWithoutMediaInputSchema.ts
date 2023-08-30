import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";
import { AssetUpdateWithoutMediaInputSchema } from "./AssetUpdateWithoutMediaInputSchema";
import { AssetUncheckedUpdateWithoutMediaInputSchema } from "./AssetUncheckedUpdateWithoutMediaInputSchema";

export const AssetUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateToOneWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => AssetUpdateWithoutMediaInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export default AssetUpdateToOneWithWhereWithoutMediaInputSchema;
