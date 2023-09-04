import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutLoadAssetJobInputSchema } from "./BaseJobCreateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema";
import { BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema } from "./BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema";
import { BaseJobUpsertWithoutLoadAssetJobInputSchema } from "./BaseJobUpsertWithoutLoadAssetJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInputSchema } from "./BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInputSchema";
import { BaseJobUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUpdateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema";

export const BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInputSchema: z.ZodType<Prisma.BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseJobCreateWithoutLoadAssetJobInputSchema),
          z.lazy(() => BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema)
        .optional(),
      upsert: z
        .lazy(() => BaseJobUpsertWithoutLoadAssetJobInputSchema)
        .optional(),
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInputSchema,
          ),
          z.lazy(() => BaseJobUpdateWithoutLoadAssetJobInputSchema),
          z.lazy(() => BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema),
        ])
        .optional(),
    })
    .strict();

export default BaseJobUpdateOneRequiredWithoutLoadAssetJobNestedInputSchema;
