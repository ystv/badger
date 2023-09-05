import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUpdateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema";
import { BaseJobCreateWithoutDummyTestJobInputSchema } from "./BaseJobCreateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedCreateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedCreateWithoutDummyTestJobInputSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const BaseJobUpsertWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobUpsertWithoutDummyTestJobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BaseJobUpdateWithoutDummyTestJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutDummyTestJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutDummyTestJobInputSchema),
      ]),
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
    })
    .strict();

export default BaseJobUpsertWithoutDummyTestJobInputSchema;
