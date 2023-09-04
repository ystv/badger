import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobCreateInputSchema } from "../inputTypeSchemas/LoadAssetJobCreateInputSchema";
import { LoadAssetJobUncheckedCreateInputSchema } from "../inputTypeSchemas/LoadAssetJobUncheckedCreateInputSchema";

export const LoadAssetJobCreateArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobCreateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      LoadAssetJobCreateInputSchema,
      LoadAssetJobUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export default LoadAssetJobCreateArgsSchema;
