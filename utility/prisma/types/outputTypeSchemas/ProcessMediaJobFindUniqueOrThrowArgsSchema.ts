import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobFindUniqueOrThrowArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobFindUniqueOrThrowArgs, "select" | "include">
> = z
  .object({
    where: ProcessMediaJobWhereUniqueInputSchema,
  })
  .strict();

export default ProcessMediaJobFindUniqueOrThrowArgsSchema;
