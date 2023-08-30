import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobWhereInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereInputSchema";

export const ProcessMediaJobDeleteManyArgsSchema: z.ZodType<Prisma.ProcessMediaJobDeleteManyArgs> =
  z
    .object({
      where: ProcessMediaJobWhereInputSchema.optional(),
    })
    .strict();

export default ProcessMediaJobDeleteManyArgsSchema;
