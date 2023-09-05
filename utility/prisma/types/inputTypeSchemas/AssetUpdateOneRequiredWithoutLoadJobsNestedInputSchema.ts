import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetCreateWithoutLoadJobsInputSchema } from "./AssetCreateWithoutLoadJobsInputSchema";
import { AssetUncheckedCreateWithoutLoadJobsInputSchema } from "./AssetUncheckedCreateWithoutLoadJobsInputSchema";
import { AssetCreateOrConnectWithoutLoadJobsInputSchema } from "./AssetCreateOrConnectWithoutLoadJobsInputSchema";
import { AssetUpsertWithoutLoadJobsInputSchema } from "./AssetUpsertWithoutLoadJobsInputSchema";
import { AssetWhereUniqueInputSchema } from "./AssetWhereUniqueInputSchema";
import { AssetUpdateToOneWithWhereWithoutLoadJobsInputSchema } from "./AssetUpdateToOneWithWhereWithoutLoadJobsInputSchema";
import { AssetUpdateWithoutLoadJobsInputSchema } from "./AssetUpdateWithoutLoadJobsInputSchema";
import { AssetUncheckedUpdateWithoutLoadJobsInputSchema } from "./AssetUncheckedUpdateWithoutLoadJobsInputSchema";

export const AssetUpdateOneRequiredWithoutLoadJobsNestedInputSchema: z.ZodType<Prisma.AssetUpdateOneRequiredWithoutLoadJobsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AssetCreateWithoutLoadJobsInputSchema),
          z.lazy(() => AssetUncheckedCreateWithoutLoadJobsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => AssetCreateOrConnectWithoutLoadJobsInputSchema)
        .optional(),
      upsert: z.lazy(() => AssetUpsertWithoutLoadJobsInputSchema).optional(),
      connect: z.lazy(() => AssetWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => AssetUpdateToOneWithWhereWithoutLoadJobsInputSchema),
          z.lazy(() => AssetUpdateWithoutLoadJobsInputSchema),
          z.lazy(() => AssetUncheckedUpdateWithoutLoadJobsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default AssetUpdateOneRequiredWithoutLoadJobsNestedInputSchema;
