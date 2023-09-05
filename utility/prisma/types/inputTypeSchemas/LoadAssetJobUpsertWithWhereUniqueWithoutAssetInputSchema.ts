import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobUpdateWithoutAssetInputSchema } from "./LoadAssetJobUpdateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedUpdateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedUpdateWithoutAssetInputSchema";
import { LoadAssetJobCreateWithoutAssetInputSchema } from "./LoadAssetJobCreateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedCreateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateWithoutAssetInputSchema";

export const LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobUpsertWithWhereUniqueWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => LoadAssetJobUpdateWithoutAssetInputSchema),
        z.lazy(() => LoadAssetJobUncheckedUpdateWithoutAssetInputSchema),
      ]),
      create: z.union([
        z.lazy(() => LoadAssetJobCreateWithoutAssetInputSchema),
        z.lazy(() => LoadAssetJobUncheckedCreateWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema;
