import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaCreateWithoutAssetInputSchema } from "./MediaCreateWithoutAssetInputSchema";
import { MediaUncheckedCreateWithoutAssetInputSchema } from "./MediaUncheckedCreateWithoutAssetInputSchema";

export const MediaCreateOrConnectWithoutAssetInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutAssetInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default MediaCreateOrConnectWithoutAssetInputSchema;
