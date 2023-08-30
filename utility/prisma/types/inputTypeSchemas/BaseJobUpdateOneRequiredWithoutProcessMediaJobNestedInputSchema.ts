import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutProcessMediaJobInputSchema } from "./BaseJobCreateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedCreateWithoutProcessMediaJobInputSchema";
import { BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema } from "./BaseJobCreateOrConnectWithoutProcessMediaJobInputSchema";
import { BaseJobUpsertWithoutProcessMediaJobInputSchema } from "./BaseJobUpsertWithoutProcessMediaJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInputSchema } from "./BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInputSchema";
import { BaseJobUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUpdateWithoutProcessMediaJobInputSchema";
import { BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema } from "./BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema";

export const BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema: z.ZodType<Prisma.BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInput> =
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
      upsert: z
        .lazy(() => BaseJobUpsertWithoutProcessMediaJobInputSchema)
        .optional(),
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => BaseJobUpdateToOneWithWhereWithoutProcessMediaJobInputSchema,
          ),
          z.lazy(() => BaseJobUpdateWithoutProcessMediaJobInputSchema),
          z.lazy(() => BaseJobUncheckedUpdateWithoutProcessMediaJobInputSchema),
        ])
        .optional(),
    })
    .strict();

export default BaseJobUpdateOneRequiredWithoutProcessMediaJobNestedInputSchema;
