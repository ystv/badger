import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema";

export const DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => DummyTestJobWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => DummyTestJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default DummyTestJobUpdateWithWhereUniqueWithoutBase_jobInputSchema;
