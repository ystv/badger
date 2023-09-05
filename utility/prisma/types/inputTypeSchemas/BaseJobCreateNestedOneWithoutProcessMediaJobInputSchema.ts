import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutProcessMediaJobInputSchema } from "./BaseJobCreateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema";
import { BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema } from "./BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";

export const BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema: z.ZodType<Prisma.BaseJobCreateNestedOneWithoutProcessMediaJobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseJobCreateWithoutProcessMediaJobInputSchema),
          z.lazy(() => BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema)
        .optional(),
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default BaseJobCreateNestedOneWithoutProcessMediaJobInputSchema;
