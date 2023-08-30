import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutDummyTestJobInputSchema } from "./BaseJobCreateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedCreateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedCreateWithoutDummyTestJobInputSchema";
import { BaseJobCreateOrConnectWithoutDummyTestJobInputSchema } from "./BaseJobCreateOrConnectWithoutDummyTestJobInputSchema";
import { BaseJobUpsertWithoutDummyTestJobInputSchema } from "./BaseJobUpsertWithoutDummyTestJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobUpdateToOneWithWhereWithoutDummyTestJobInputSchema } from "./BaseJobUpdateToOneWithWhereWithoutDummyTestJobInputSchema";
import { BaseJobUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUpdateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema";

export const BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInputSchema: z.ZodType<Prisma.BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseJobCreateWithoutDummyTestJobInputSchema),
          z.lazy(() => BaseJobUncheckedCreateWithoutDummyTestJobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseJobCreateOrConnectWithoutDummyTestJobInputSchema)
        .optional(),
      upsert: z
        .lazy(() => BaseJobUpsertWithoutDummyTestJobInputSchema)
        .optional(),
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => BaseJobUpdateToOneWithWhereWithoutDummyTestJobInputSchema,
          ),
          z.lazy(() => BaseJobUpdateWithoutDummyTestJobInputSchema),
          z.lazy(() => BaseJobUncheckedUpdateWithoutDummyTestJobInputSchema),
        ])
        .optional(),
    })
    .strict();

export default BaseJobUpdateOneRequiredWithoutDummyTestJobNestedInputSchema;
