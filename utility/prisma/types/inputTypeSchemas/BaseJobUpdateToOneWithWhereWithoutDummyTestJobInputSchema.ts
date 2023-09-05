import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";
import { BaseJobUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUpdateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema";

export const BaseJobUpdateToOneWithWhereWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobUpdateToOneWithWhereWithoutDummyTestJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BaseJobUpdateWithoutDummyTestJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobUpdateToOneWithWhereWithoutDummyTestJobInputSchema;
