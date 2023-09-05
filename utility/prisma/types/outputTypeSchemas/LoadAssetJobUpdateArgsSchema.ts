import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobUpdateInputSchema } from "../inputTypeSchemas/LoadAssetJobUpdateInputSchema";
import { LoadAssetJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/LoadAssetJobUncheckedUpdateInputSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobUpdateArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      LoadAssetJobUpdateInputSchema,
      LoadAssetJobUncheckedUpdateInputSchema,
    ]),
    where: LoadAssetJobWhereUniqueInputSchema,
  })
  .strict();

export default LoadAssetJobUpdateArgsSchema;
