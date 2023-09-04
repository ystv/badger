import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";

export const ContinuityItemScalarWhereInputSchema: z.ZodType<Prisma.ContinuityItemScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContinuityItemScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContinuityItemScalarWhereInputSchema),
          z.lazy(() => ContinuityItemScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      showId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      durationSeconds: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default ContinuityItemScalarWhereInputSchema;
