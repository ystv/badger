import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";
import { LoadAssetJobUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUpdateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema";

export const LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => LoadAssetJobUpdateWithoutBase_jobInputSchema),
        z.lazy(() => LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInputSchema;
