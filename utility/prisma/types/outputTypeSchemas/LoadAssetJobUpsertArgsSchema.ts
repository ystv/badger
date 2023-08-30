import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobCreateInputSchema } from "../inputTypeSchemas/LoadAssetJobCreateInputSchema";
import { LoadAssetJobUncheckedCreateInputSchema } from "../inputTypeSchemas/LoadAssetJobUncheckedCreateInputSchema";
import { LoadAssetJobUpdateInputSchema } from "../inputTypeSchemas/LoadAssetJobUpdateInputSchema";
import { LoadAssetJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/LoadAssetJobUncheckedUpdateInputSchema";

export const LoadAssetJobUpsertArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobUpsertArgs, "select" | "include">
> = z
  .object({
    where: LoadAssetJobWhereUniqueInputSchema,
    create: z.union([
      LoadAssetJobCreateInputSchema,
      LoadAssetJobUncheckedCreateInputSchema,
    ]),
    update: z.union([
      LoadAssetJobUpdateInputSchema,
      LoadAssetJobUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export default LoadAssetJobUpsertArgsSchema;
