import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobDeleteArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobDeleteArgs, "select" | "include">
> = z
  .object({
    where: LoadAssetJobWhereUniqueInputSchema,
  })
  .strict();

export default LoadAssetJobDeleteArgsSchema;
