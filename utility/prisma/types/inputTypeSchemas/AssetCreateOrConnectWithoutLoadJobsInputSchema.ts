import type { Prisma } from "../../client";
import { z } from "zod";
import { AssetWhereUniqueInputSchema } from "./AssetWhereUniqueInputSchema";
import { AssetCreateWithoutLoadJobsInputSchema } from "./AssetCreateWithoutLoadJobsInputSchema";
import { AssetUncheckedCreateWithoutLoadJobsInputSchema } from "./AssetUncheckedCreateWithoutLoadJobsInputSchema";

export const AssetCreateOrConnectWithoutLoadJobsInputSchema: z.ZodType<Prisma.AssetCreateOrConnectWithoutLoadJobsInput> =
  z
    .object({
      where: z.lazy(() => AssetWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AssetCreateWithoutLoadJobsInputSchema),
        z.lazy(() => AssetUncheckedCreateWithoutLoadJobsInputSchema),
      ]),
    })
    .strict();

export default AssetCreateOrConnectWithoutLoadJobsInputSchema;
