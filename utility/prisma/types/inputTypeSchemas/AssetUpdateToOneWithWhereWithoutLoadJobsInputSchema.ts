import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";
import { AssetUpdateWithoutLoadJobsInputSchema } from "./AssetUpdateWithoutLoadJobsInputSchema";
import { AssetUncheckedUpdateWithoutLoadJobsInputSchema } from "./AssetUncheckedUpdateWithoutLoadJobsInputSchema";

export const AssetUpdateToOneWithWhereWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetUpdateToOneWithWhereWithoutLoadJobsInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => AssetUpdateWithoutLoadJobsInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutLoadJobsInputSchema),
      ]),
    })
    .strict();

export default AssetUpdateToOneWithWhereWithoutLoadJobsInputSchema;
