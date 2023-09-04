import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobWhereUniqueInputSchema } from "../inputTypeSchemas/LoadAssetJobWhereUniqueInputSchema";

export const LoadAssetJobFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.LoadAssetJobFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: LoadAssetJobWhereUniqueInputSchema,
  })
  .strict();

export default LoadAssetJobFindUniqueOrThrowArgsSchema;
