import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";
import { DummyTestJobCreateOrConnectWithoutBase_jobInputSchema } from "./DummyTestJobCreateOrConnectWithoutBase_jobInputSchema";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";

export const DummyTestJobCreateNestedOneWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobCreateNestedOneWithoutBase_jobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
          z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DummyTestJobCreateOrConnectWithoutBase_jobInputSchema)
        .optional(),
      connect: z.lazy(() => DummyTestJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default DummyTestJobCreateNestedOneWithoutBase_jobInputSchema;
