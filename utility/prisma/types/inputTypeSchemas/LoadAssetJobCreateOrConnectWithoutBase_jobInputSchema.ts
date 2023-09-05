import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobCreateWithoutBase_jobInputSchema } from "./LoadAssetJobCreateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema";

export const LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobCreateOrConnectWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => LoadAssetJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema;
