import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereUniqueInputSchema } from "./BaseJobWhereUniqueInputSchema";
import { BaseJobCreateWithoutLoadAssetJobInputSchema } from "./BaseJobCreateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema";

export const BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobCreateOrConnectWithoutLoadAssetJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BaseJobCreateWithoutLoadAssetJobInputSchema),
        z.lazy(() => BaseJobUncheckedCreateWithoutLoadAssetJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobCreateOrConnectWithoutLoadAssetJobInputSchema;
