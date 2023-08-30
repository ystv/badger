import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobCreateWithoutDummyTestJobInputSchema } from "./BaseJobCreateWithoutDummyTestJobInputSchema";
import { BaseJobUncheckedCreateWithoutDummyTestJobInputSchema } from "./BaseJobUncheckedCreateWithoutDummyTestJobInputSchema";

export const BaseJobCreateOrConnectWithoutDummyTestJobInputSchema: z.ZodType<Prisma.BaseJobCreateOrConnectWithoutDummyTestJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutDummyTestJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutDummyTestJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobCreateOrConnectWithoutDummyTestJobInputSchema;
