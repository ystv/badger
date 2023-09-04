import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobScalarWhereInputSchema } from "./LoadAssetJobScalarWhereInputSchema";
import { LoadAssetJobUpdateManyMutationInputSchema } from "./LoadAssetJobUpdateManyMutationInputSchema";
import { LoadAssetJobUncheckedUpdateManyWithoutAssetInputSchema } from "./LoadAssetJobUncheckedUpdateManyWithoutAssetInputSchema";

export const LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateManyWithWhereWithoutAssetInput> =
  z
    .object({
      where: z.lazy(() => LoadAssetJobScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => LoadAssetJobUpdateManyMutationInputSchema),
        z.lazy(() => LoadAssetJobUncheckedUpdateManyWithoutAssetInputSchema),
      ]),
    })
    .strict();

export default LoadAssetJobUpdateManyWithWhereWithoutAssetInputSchema;
