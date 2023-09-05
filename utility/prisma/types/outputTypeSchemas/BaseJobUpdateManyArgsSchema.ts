import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobUpdateManyMutationInputSchema } from "../inputTypeSchemas/BaseJobUpdateManyMutationInputSchema";
import { BaseJobUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/BaseJobUncheckedUpdateManyInputSchema";
import { BaseJobWhereInputSchema } from "../inputTypeSchemas/BaseJobWhereInputSchema";

export const BaseJobUpdateManyArgsSchema: z.ZodType<Prisma.BaseJobUpdateManyArgs> =
  z
    .object({
      data: z.union([
        BaseJobUpdateManyMutationInputSchema,
        BaseJobUncheckedUpdateManyInputSchema,
      ]),
      where: BaseJobWhereInputSchema.optional(),
    })
    .strict();

export default BaseJobUpdateManyArgsSchema;
