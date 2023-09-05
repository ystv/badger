import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUpdateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema";
import { BaseJobCreateWithoutLoadAssetJobInputSchema } from "./BaseJobCreateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const BaseJobUpsertWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobUpsertWithoutLoadAssetJobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BaseJobUpdateWithoutLoadAssetJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutLoadAssetJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema),
      ]),
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
    })
    .strict();

export default BaseJobUpsertWithoutLoadAssetJobInputSchema;
