import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobWhereUniqueInputSchema } from "../inputTypeSchemas/BaseJobWhereUniqueInputSchema";

export const BaseJobFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.BaseJobFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: BaseJobWhereUniqueInputSchema,
  })
  .strict();

export default BaseJobFindUniqueOrThrowArgsSchema;
