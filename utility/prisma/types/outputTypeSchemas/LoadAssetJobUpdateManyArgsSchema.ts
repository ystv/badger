import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobUpdateManyMutationInputSchema } from "../inputTypeSchemas/LoadAssetJobUpdateManyMutationInputSchema";
import { LoadAssetJobUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/LoadAssetJobUncheckedUpdateManyInputSchema";
import { LoadAssetJobWhereInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereInputSchema";

export const LoadAssetJobUpdateManyArgsSchema: z.ZodType<Prisma.LoadAssetJobUpdateManyArgs> =
  z
    .object({
      data: z.union([
        LoadAssetJobUpdateManyMutationInputSchema,
        LoadAssetJobUncheckedUpdateManyInputSchema,
      ]),
      where: LoadAssetJobWhereInputSchema.optional(),
    })
    .strict();

export default LoadAssetJobUpdateManyArgsSchema;
