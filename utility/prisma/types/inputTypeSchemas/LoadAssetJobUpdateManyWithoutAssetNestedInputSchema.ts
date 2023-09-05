import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobCreateWithoutAssetInputSchema } from "./LoadAssetJobCreateWithoutAssetInputSchema";
import { LoadAssetJobUncheckedCreateWithoutAssetInputSchema } from "./LoadAssetJobUncheckedCreateWithoutAssetInputSchema";
import { LoadAssetJobCreateOrConnectWithoutAssetInputSchema } from "./LoadAssetJobCreateOrConnectWithoutAssetInputSchema";
import { LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema } from "./LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema";
import { LoadAssetJobCreateManyAssetInputEnvelopeSchema } from "./LoadAssetJobCreateManyAssetInputEnvelopeSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema } from "./LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema";
import { LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema } from "./LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema";
import { LoadAssetJobScalarWhereInputSchema } from "./LoadAssetJobScalarWhereInputSchema";

export const LoadAssetJobUpdateManyWithoutAssetNestedInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateManyWithoutAssetNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema,
          ),
          z
            .lazy(
              () => LoadAssetJobUpsertWithWhereUniqueWithoutAssetInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => LoadAssetJobCreateManyAssetInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema),
          z.lazy(() => LoadAssetJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema,
          ),
          z
            .lazy(
              () => LoadAssetJobUpdateWithWhereUniqueWithoutAssetInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema),
          z
            .lazy(() => LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LoadAssetJobScalarWhereInputSchema),
          z.lazy(() => LoadAssetJobScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default LoadAssetJobUpdateManyWithoutAssetNestedInputSchema;
