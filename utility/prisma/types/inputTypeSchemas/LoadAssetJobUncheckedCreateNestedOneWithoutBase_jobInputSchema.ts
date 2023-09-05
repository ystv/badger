import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobCreateWithoutBase_jobInputSchema } from "./LoadAssetJobCreateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema";
import { LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema } from "./LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LoadAssetJobCreateWithoutBase_jobInputSchema),
          z.lazy(() => LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema)
        .optional(),
      connect: z.lazy(() => LoadAssetJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default LoadAssetJobUncheckedCreateNestedOneWithoutBase_jobInputSchema;
