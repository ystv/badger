import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";
import { DummyTestJobCreateOrConnectWithoutBase_jobInputSchema } from "./DummyTestJobCreateOrConnectWithoutBase_jobInputSchema";
import { DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema } from "./DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema";
import { DummyTestJobCreateManyBase_jobInputEnvelopeSchema } from "./DummyTestJobCreateManyBase_jobInputEnvelopeSchema";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema";
import { DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema } from "./DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema";
import { DummyTestJobScalarWhereInputSchema } from "./DummyTestJobScalarWhereInputSchema";

export const DummyTestJobUncheckedUpdateManyWithoutBase_jobNestedInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedUpdateManyWithoutBase_jobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
          z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema).array(),
          z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
          z
            .lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DummyTestJobCreateOrConnectWithoutBase_jobInputSchema),
          z
            .lazy(() => DummyTestJobCreateOrConnectWithoutBase_jobInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema,
          ),
          z
            .lazy(
              () => DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DummyTestJobCreateManyBase_jobInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DummyTestJobWhereUniqueInputSchema),
          z.lazy(() => DummyTestJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DummyTestJobWhereUniqueInputSchema),
          z.lazy(() => DummyTestJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DummyTestJobWhereUniqueInputSchema),
          z.lazy(() => DummyTestJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DummyTestJobWhereUniqueInputSchema),
          z.lazy(() => DummyTestJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema,
          ),
          z
            .lazy(
              () => DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema,
          ),
          z
            .lazy(
              () => DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DummyTestJobScalarWhereInputSchema),
          z.lazy(() => DummyTestJobScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default DummyTestJobUncheckedUpdateManyWithoutBase_jobNestedInputSchema;
