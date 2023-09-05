import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobCreateWithoutLoadAssetJobInputSchema } from "./BaseJobCreateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema";
import { BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema } from "./BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";

export const BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobCreateNestedOneWithoutLoadAssetJobInput> =
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
      connect: z.lazy(() => BaseJobWhereUniqueInputSchema).optional(),
    })
    .strict();

export default BaseJobCreateNestedOneWithoutLoadAssetJobInputSchema;
