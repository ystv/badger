import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";

export const DummyTestJobUpsertWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpsertWithoutBase_jobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DummyTestJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
      where: z.lazy(() => DummyTestJobWhereInputSchema).optional(),
    })
    .strict();

export default DummyTestJobUpsertWithoutBase_jobInputSchema;
