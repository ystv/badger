import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereInputSchema";

export const LoadAssetJobDeleteManyArgsSchema: z.ZodType<Prisma.LoadAssetJobDeleteManyArgs> =
  z
    .object({
      where: LoadAssetJobWhereInputSchema.optional(),
    })
    .strict();

export default LoadAssetJobDeleteManyArgsSchema;
