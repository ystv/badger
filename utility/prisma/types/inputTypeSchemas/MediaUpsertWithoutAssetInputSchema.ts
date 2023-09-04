import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaUpdateWithoutAssetInputSchema } from "./MediaUpdateWithoutAssetInputSchema";
import { MediaUncheckedUpdateWithoutAssetInputSchema } from "./MediaUncheckedUpdateWithoutAssetInputSchema";
import { MediaCreateWithoutAssetInputSchema } from "./MediaCreateWithoutAssetInputSchema";
import { MediaUncheckedCreateWithoutAssetInputSchema } from "./MediaUncheckedCreateWithoutAssetInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaUpsertWithoutAssetInputSchema: z.ZodType<Prisma.MediaUpsertWithoutAssetInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutAssetInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutAssetInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutAssetInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutAssetInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export default MediaUpsertWithoutAssetInputSchema;
