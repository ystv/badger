import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobDeleteArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobDeleteArgs, "select" | "include">
> = z
  .object({
    where: ProcessMediaJobWhereUniqueInputSchema,
  })
  .strict();

export default ProcessMediaJobDeleteArgsSchema;
