import { z } from "zod";
import type { Prisma } from "../../client";
import { ContinuityItemWhereInputSchema } from "../inputTypeSchemas/ContinuityItemWhereInputSchema";

export const ContinuityItemDeleteManyArgsSchema: z.ZodType<Prisma.ContinuityItemDeleteManyArgs> =
  z
    .object({
      where: ContinuityItemWhereInputSchema.optional(),
    })
    .strict();

export default ContinuityItemDeleteManyArgsSchema;
