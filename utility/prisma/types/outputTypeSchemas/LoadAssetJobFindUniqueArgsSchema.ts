import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: LoadAssetJobWhereUniqueInputSchema,
  })
  .strict();

export default LoadAssetJobFindUniqueArgsSchema;
