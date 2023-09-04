import { z } from "zod";
import type { Prisma } from "../../client";
import { BaseJobWhereInputSchema } from "../inputTypeSchemas/BaseJobWhereInputSchema";

export const BaseJobDeleteManyArgsSchema: z.ZodType<Prisma.BaseJobDeleteManyArgs> =
  z
    .object({
      where: BaseJobWhereInputSchema.optional(),
    })
    .strict();

export default BaseJobDeleteManyArgsSchema;
