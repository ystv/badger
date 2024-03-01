import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";
import { DummyTestJobUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema";

export const DummyTestJobUpdateToOneWithWhereWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpdateToOneWithWhereWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => DummyTestJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DummyTestJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default DummyTestJobUpdateToOneWithWhereWithoutBase_jobInputSchema;
