import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";
import { RundownListRelationFilterSchema } from "./RundownListRelationFilterSchema";
import { ContinuityItemListRelationFilterSchema } from "./ContinuityItemListRelationFilterSchema";

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ShowWhereInputSchema),
        z.lazy(() => ShowWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ShowWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ShowWhereInputSchema),
        z.lazy(() => ShowWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    start: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    rundowns: z.lazy(() => RundownListRelationFilterSchema).optional(),
    continuityItems: z
      .lazy(() => ContinuityItemListRelationFilterSchema)
      .optional(),
  })
  .strict();

export default ShowWhereInputSchema;
