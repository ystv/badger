import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutDummyTestJobInputSchema } from "./BaseJobCreateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedCreateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedCreateWithoutDummyTestJobInputSchema";
import { BaseJobCreateOrConnectWithoutDummyTestJobInputSchema } from "./BaseJobCreateOrConnectWithoutDummyTestJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";

export const BaseJobCreateNestedOneWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobCreateNestedOneWithoutDummyTestJobInput> =
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
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default BaseJobCreateNestedOneWithoutDummyTestJobInputSchema;
