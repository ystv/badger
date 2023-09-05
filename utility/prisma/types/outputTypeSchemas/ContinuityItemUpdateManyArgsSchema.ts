import { z } from "zod";
import type { Prisma } from "../../client";
import { ContinuityItemUpdateManyMutationInputSchema } from "../inputTypeSchemas/ContinuityItemUpdateManyMutationInputSchema";
import { ContinuityItemUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/ContinuityItemUncheckedUpdateManyInputSchema";
import { ContinuityItemWhereInputSchema } from "../inputTypeSchemas/ContinuityItemWhereInputSchema";

export const ContinuityItemUpdateManyArgsSchema: z.ZodType<Prisma.ContinuityItemUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ContinuityItemUpdateManyMutationInputSchema,
        ContinuityItemUncheckedUpdateManyInputSchema,
      ]),
      where: ContinuityItemWhereInputSchema.optional(),
    })
    .strict();

export default ContinuityItemUpdateManyArgsSchema;
