import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetUpdateWithoutLoadJobsInputSchema } from "./AssetUpdateWithoutLoadJobsInputSchema";
import { AssetUncheckedUpdateWithoutLoadJobsInputSchema } from "./AssetUncheckedUpdateWithoutLoadJobsInputSchema";
import { AssetCreateWithoutLoadJobsInputSchema } from "./AssetCreateWithoutLoadJobsInputSchema";
import { AssetUncheckedCreateWithoutLoadJobsInputSchema } from "./AssetUncheckedCreateWithoutLoadJobsInputSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const AssetUpsertWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetUpsertWithoutLoadJobsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => AssetUpdateWithoutLoadJobsInputSchema),
        z.lazy(() => AssetUncheckedUpdateWithoutLoadJobsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AssetCreateWithoutLoadJobsInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutLoadJobsInputSchema),
      ]),
      where: z.lazy(() => AssetWhereInputSchema).optional(),
    })
    .strict();

export default AssetUpsertWithoutLoadJobsInputSchema;
