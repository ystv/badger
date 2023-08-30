import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobCreateManyInputSchema } from "../inputTypeSchemas/LoadAssetJobCreateManyInputSchema";

export const LoadAssetJobCreateManyArgsSchema: z.ZodType<Prisma.LoadAssetJobCreateManyArgs> =
  z
    .object({
      data: z.union([
        LoadAssetJobCreateManyInputSchema,
        LoadAssetJobCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default LoadAssetJobCreateManyArgsSchema;
