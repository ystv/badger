import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutAssetInputSchema } from "./MediaCreateWithoutAssetInputSchema";
import { MediaUncheckedCreateWithoutAssetInputSchema } from "./MediaUncheckedCreateWithoutAssetInputSchema";
import { MediaCreateOrConnectWithoutAssetInputSchema } from "./MediaCreateOrConnectWithoutAssetInputSchema";
import { MediaUpsertWithoutAssetInputSchema } from "./MediaUpsertWithoutAssetInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaUpdateToOneWithWhereWithoutAssetInputSchema } from "./MediaUpdateToOneWithWhereWithoutAssetInputSchema";
import { MediaUpdateWithoutAssetInputSchema } from "./MediaUpdateWithoutAssetInputSchema";
import { MediaUncheckedUpdateWithoutAssetInputSchema } from "./MediaUncheckedUpdateWithoutAssetInputSchema";

export const MediaUpdateOneRequiredWithoutAssetNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutAssetNestedInput> =
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
      upsert: z.lazy(() => MediaUpsertWithoutAssetInputSchema).optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutAssetInputSchema),
          z.lazy(() => MediaUpdateWithoutAssetInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutAssetInputSchema),
        ])
        .optional(),
    })
    .strict();

export default MediaUpdateOneRequiredWithoutAssetNestedInputSchema;
