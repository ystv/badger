import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaUpdateWithoutAssetInputSchema } from "./MediaUpdateWithoutAssetInputSchema";
import { MediaUncheckedUpdateWithoutAssetInputSchema } from "./MediaUncheckedUpdateWithoutAssetInputSchema";

export const MediaUpdateToOneWithWhereWithoutAssetInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutAssetInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default MediaUpdateToOneWithWhereWithoutAssetInputSchema;
