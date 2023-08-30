import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobCreateWithoutMediaInputSchema } from "./ProcessMediaJobCreateWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateWithoutMediaInputSchema";
import { ProcessMediaJobCreateOrConnectWithoutMediaInputSchema } from "./ProcessMediaJobCreateOrConnectWithoutMediaInputSchema";
import { ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema } from "./ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema";
import { ProcessMediaJobCreateManyMediaInputEnvelopeSchema } from "./ProcessMediaJobCreateManyMediaInputEnvelopeSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "./ProcessMediaJobWhereUniqueInputSchema";
import { ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema } from "./ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema";
import { ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema } from "./ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema";
import { ProcessMediaJobScalarWhereInputSchema } from "./ProcessMediaJobScalarWhereInputSchema";

export const ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema),
          z.lazy(() => ProcessMediaJobCreateWithoutMediaInputSchema).array(),
          z.lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema),
          z
            .lazy(() => ProcessMediaJobUncheckedCreateWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProcessMediaJobCreateOrConnectWithoutMediaInputSchema),
          z
            .lazy(() => ProcessMediaJobCreateOrConnectWithoutMediaInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ProcessMediaJobUpsertWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ProcessMediaJobCreateManyMediaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema),
          z.lazy(() => ProcessMediaJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ProcessMediaJobUpdateWithWhereUniqueWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema,
          ),
          z
            .lazy(
              () => ProcessMediaJobUpdateManyWithWhereWithoutMediaInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema),
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default ProcessMediaJobUncheckedUpdateManyWithoutMediaNestedInputSchema;
