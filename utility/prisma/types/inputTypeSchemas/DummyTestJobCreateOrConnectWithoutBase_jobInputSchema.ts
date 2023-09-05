import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";

export const DummyTestJobCreateOrConnectWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobCreateOrConnectWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => DummyTestJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default DummyTestJobCreateOrConnectWithoutBase_jobInputSchema;
