import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobScalarWhereInputSchema } from "./DummyTestJobScalarWhereInputSchema";
import { DummyTestJobUpdateManyMutationInputSchema } from "./DummyTestJobUpdateManyMutationInputSchema";
import { DummyTestJobUncheckedUpdateManyWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateManyWithoutBase_jobInputSchema";

export const DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUpdateManyWithWhereWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => DummyTestJobScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => DummyTestJobUpdateManyMutationInputSchema),
        z.lazy(() => DummyTestJobUncheckedUpdateManyWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default DummyTestJobUpdateManyWithWhereWithoutBase_jobInputSchema;
