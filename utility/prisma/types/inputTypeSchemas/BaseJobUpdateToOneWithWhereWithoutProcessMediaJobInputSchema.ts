import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";
import { BaseJobUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUpdateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema";

export const BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInputSchema: z.ZodType<Prisma.BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BaseJobUpdateWithoutProcessMediaJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInputSchema;
