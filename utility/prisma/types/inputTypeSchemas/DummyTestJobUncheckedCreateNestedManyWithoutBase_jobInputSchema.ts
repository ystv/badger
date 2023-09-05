import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";
import { DummyTestJobCreateOrConnectWithoutBase_jobInputSchema } from "./DummyTestJobCreateOrConnectWithoutBase_jobInputSchema";
import { DummyTestJobCreateManyBase_jobInputEnvelopeSchema } from "./DummyTestJobCreateManyBase_jobInputEnvelopeSchema";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInput> =
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
      createMany: z
        .lazy(() => DummyTestJobCreateManyBase_jobInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DummyTestJobWhereUniqueInputSchema),
          z.lazy(() => DummyTestJobWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default DummyTestJobUncheckedCreateNestedManyWithoutBase_jobInputSchema;
