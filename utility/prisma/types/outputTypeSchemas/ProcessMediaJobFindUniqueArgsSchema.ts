import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobFindUniqueArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobFindUniqueArgs, "select" | "include">
> = z
  .object({
    where: ProcessMediaJobWhereUniqueInputSchema,
  })
  .strict();

export default ProcessMediaJobFindUniqueArgsSchema;
