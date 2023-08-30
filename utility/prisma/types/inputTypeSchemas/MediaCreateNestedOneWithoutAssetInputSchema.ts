import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutAssetInputSchema } from "./MediaCreateWithoutAssetInputSchema";
import { MediaUncheckedCreateWithoutAssetInputSchema } from "./MediaUncheckedCreateWithoutAssetInputSchema";
import { MediaCreateOrConnectWithoutAssetInputSchema } from "./MediaCreateOrConnectWithoutAssetInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";

export const MediaCreateNestedOneWithoutAssetInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutAssetInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutAssetInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutAssetInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutAssetInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export default MediaCreateNestedOneWithoutAssetInputSchema;
