import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUpdateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema";
import { LoadAssetJobCreateWithoutBase_jobInputSchema } from "./LoadAssetJobCreateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";

export const LoadAssetJobUpsertWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUpsertWithoutBase_jobInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => LoadAssetJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => LoadAssetJobCreateWithoutBase_jobInputSchema),
        z.lazy(() => LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema),
      ]),
      where: z.lazy(() => LoadAssetJobWhereInputSchema).optional(),
    })
    .strict();

export default LoadAssetJobUpsertWithoutBase_jobInputSchema;
