import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobCreateWithoutAssetInputSchema } from "./LoadAssetJobCreateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedCreateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateWithoutAssetInputSchema";

export const LoadAssetJobCreateOrConnectWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobCreateOrConnectWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => LoadAssetJobCreateWithoutAssetInputSchema),
        z.lazy(() => LoadAssetJobUncheckedCreateWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobCreateOrConnectWithoutAssetInputSchema;
