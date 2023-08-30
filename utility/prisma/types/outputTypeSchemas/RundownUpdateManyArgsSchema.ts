import { z } from "zod";
import type { Prisma } from "../../client";
import { RundownUpdateManyMutationInputSchema } from "../inputTypeSchemas/RundownUpdateManyMutationInputSchema";
import { RundownUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/RundownUncheckedUpdateManyInputSchema";
import { RundownWhereInputSchema } from "../inputTypeSchemas/RundownWhereInputSchema";

export const RundownUpdateManyArgsSchema: z.ZodType<Prisma.RundownUpdateManyArgs> =
  z
    .object({
      data: z.union([
        RundownUpdateManyMutationInputSchema,
        RundownUncheckedUpdateManyInputSchema,
      ]),
      where: RundownWhereInputSchema.optional(),
    })
    .strict();

export default RundownUpdateManyArgsSchema;
