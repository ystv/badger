import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobCreateWithoutAssetInputSchema } from "./LoadAssetJobCreateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedCreateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateWithoutAssetInputSchema";
import { LoadAssetJobCreateOrConnectWithoutAssetInputSchema } from "./LoadAssetJobCreateOrConnectWithoutAssetInputSchema";
import { LoadAssetJobCreateManyAssetInputEnvelopeSchema } from "./LoadAssetJobCreateManyAssetInputEnvelopeSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobCreateNestedManyWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobCreateNestedManyWithoutAssetInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LoadAssetJobCreateWithoutAssetInputSchema),
          z.lazy(() => LoadAssetJobCreateWithoutAssetInputSchema).array(),
          z.lazy(() => LoadAssetJobUncheckedCreateWithoutAssetInputSchema),
          z
            .lazy(() => LoadAssetJobUncheckedCreateWithoutAssetInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LoadAssetJobCreateOrConnectWithoutAssetInputSchema),
          z
            .lazy(() => LoadAssetJobCreateOrConnectWithoutAssetInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LoadAssetJobCreateManyAssetInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default LoadAssetJobCreateNestedManyWithoutAssetInputSchema;
