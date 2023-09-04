import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetCreateWithoutLoadJobsInputSchema } from "./AssetCreateWithoutLoadJobsInputSchema";
import { AssetUncheckedCreateWithoutLoadJobsInputSchema } from "./AssetUncheckedCreateWithoutLoadJobsInputSchema";
import { AssetCreateOrConnectWithoutLoadJobsInputSchema } from "./AssetCreateOrConnectWithoutLoadJobsInputSchema";
import { AssetWhereUniqueInputSchema } from "./AssetWhereUniqueInputSchema";

export const AssetCreateNestedOneWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetCreateNestedOneWithoutLoadJobsInput> =
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
      connect: z.lazy(() => AssetWhereUniqueInputSchema).optional(),
    })
    .strict();

export default AssetCreateNestedOneWithoutLoadJobsInputSchema;
