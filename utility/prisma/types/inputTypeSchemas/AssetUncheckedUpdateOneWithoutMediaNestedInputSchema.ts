import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetCreateWithoutMediaInputSchema } from "./AssetCreateWithoutMediaInputSchema";
import { AssetUncheckedCreateWithoutMediaInputSchema } from "./AssetUncheckedCreateWithoutMediaInputSchema";
import { AssetCreateOrConnectWithoutMediaInputSchema } from "./AssetCreateOrConnectWithoutMediaInputSchema";
import { AssetUpsertWithoutMediaInputSchema } from "./AssetUpsertWithoutMediaInputSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";
import { AssetWhereUniqueInputSchema } from "./AssetWhereUniqueInputSchema";
import { AssetUpdateToOneWithWhereWithoutMediaInputSchema } from "./AssetUpdateToOneWithWhereWithoutMediaInputSchema";
import { AssetUpdateWithoutMediaInputSchema } from "./AssetUpdateWithoutMediaInputSchema";
import { AssetUncheckedUpdateWithoutMediaInputSchema } from "./AssetUncheckedUpdateWithoutMediaInputSchema";

export const AssetUncheckedUpdateOneWithoutMediaNestedInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateOneWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => AssetCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      upsert: z.lazy(() => AssetUpsertWithoutMediaInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => AssetWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => AssetWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => AssetWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateToOneWithWhereWithoutMediaInputSchema),
          z.lazy(() => AssetUpdateWithoutMediaInputSchema),
          z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema),
        ])
        .optional(),
    })
    .strict();

export default AssetUncheckedUpdateOneWithoutMediaNestedInputSchema;
