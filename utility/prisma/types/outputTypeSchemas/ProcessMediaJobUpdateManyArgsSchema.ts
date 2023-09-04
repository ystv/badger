import { z } from "zod";
import type { Prisma } from "../../client";
import { ProcessMediaJobUpdateManyMutationInputSchema } from "../inputTypeSchemas/ProcessMediaJobUpdateManyMutationInputSchema";
import { ProcessMediaJobUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/ProcessMediaJobUncheckedUpdateManyInputSchema";
import { ProcessMediaJobWhereInputSchema } from "../inputTypeSchemas/ProcessMediaJobWhereInputSchema";

export const ProcessMediaJobUpdateManyArgsSchema: z.ZodType<Prisma.ProcessMediaJobUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ProcessMediaJobUpdateManyMutationInputSchema,
        ProcessMediaJobUncheckedUpdateManyInputSchema,
      ]),
      where: ProcessMediaJobWhereInputSchema.optional(),
    })
    .strict();

export default ProcessMediaJobUpdateManyArgsSchema;
