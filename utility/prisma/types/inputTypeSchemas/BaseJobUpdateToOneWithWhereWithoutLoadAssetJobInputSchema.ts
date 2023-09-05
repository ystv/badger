import type { Prisma } from "../../client";
import { z } from "zod";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";
import { BaseJobUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUpdateWithoutLoadAssetJobInputSchema";
import { BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema } from "./BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema";

export const BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInputSchema: z.ZodType<Prisma.BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInput> =
  z
    .object({
      where: z.lazy(() => BaseJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BaseJobUpdateWithoutLoadAssetJobInputSchema),
        z.lazy(() => BaseJobUncheckedUpdateWithoutLoadAssetJobInputSchema),
      ]),
    })
    .strict();

export default BaseJobUpdateToOneWithWhereWithoutLoadAssetJobInputSchema;
