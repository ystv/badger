import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetCreateWithoutMediaInputSchema } from "./AssetCreateWithoutMediaInputSchema";
import { AssetUncheckedCreateWithoutMediaInputSchema } from "./AssetUncheckedCreateWithoutMediaInputSchema";
import { AssetCreateOrConnectWithoutMediaInputSchema } from "./AssetCreateOrConnectWithoutMediaInputSchema";
import { AssetWhereUniqueInputSchema } from "./AssetWhereUniqueInputSchema";

export const AssetUncheckedCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedCreateNestedOneWithoutMediaInput> =
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
      connect: z.lazy(() => AssetWhereUniqueInputSchema).optional(),
    })
    .strict();

export default AssetUncheckedCreateNestedOneWithoutMediaInputSchema;
