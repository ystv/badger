import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobUpdateWithoutAssetInputSchema } from "./LoadAssetJobUpdateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedUpdateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedUpdateWithoutAssetInputSchema";

export const LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateWithWhereUniqueWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => LoadAssetJobUpdateWithoutAssetInputSchema),
        z.lazy(() => LoadAssetJobUncheckedUpdateWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema;
