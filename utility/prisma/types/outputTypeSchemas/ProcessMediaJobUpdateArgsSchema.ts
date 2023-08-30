import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobUpdateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUpdateInputSchema";
import { ProcessMediaJobUncheckedUpdateInputSchema } from "../inputTypeSchemas/ProcessMediaJobUncheckedUpdateInputSchema";
import { ProcessMediaJobWhereUniqueInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereUniqueInputSchema";

export const ProcessMediaJobUpdateArgsSchema: z.ZodType<
  Omit<Prisma.ProcessMediaJobUpdateArgs, "select" | "include">
> = z
  .object({
    data: z.union([
      ProcessMediaJobUpdateInputSchema,
      ProcessMediaJobUncheckedUpdateInputSchema,
    ]),
    where: ProcessMediaJobWhereUniqueInputSchema,
  })
  .strict();

export default ProcessMediaJobUpdateArgsSchema;
