import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUpdateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema";
import { BaseJobCreateWithoutProcessMediaJobInputSchema } from "./BaseJobCreateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const BaseJobUpsertWithoutProcessMediaJobInputSchema: z.ZodType<Prisma.BaseJobUpsertWithoutProcessMediaJobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BaseJobUpdateWithoutProcessMediaJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutProcessMediaJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema),
      ]),
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
    })
    .strict();

export default BaseJobUpsertWithoutProcessMediaJobInputSchema;
