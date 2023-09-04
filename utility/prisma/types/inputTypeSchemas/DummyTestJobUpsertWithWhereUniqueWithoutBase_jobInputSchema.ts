import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";

export const DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => DummyTestJobWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => DummyTestJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default DummyTestJobUpsertWithWhereUniqueWithoutBase_jobInputSchema;
