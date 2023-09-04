import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobCreateWithoutProcessMediaJobInputSchema } from "./BaseJobCreateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema";

export const BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema: z.ZodType<Prisma.BaseJobCreateOrConnectWithoutProcessMediaJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutProcessMediaJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema;
