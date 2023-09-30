import type { Prisma } from "../../client";
import { z } from "zod";
import { ShowWithDurationWhereInputSchema } from "./ShowWithDurationWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";

export const ShowWithDurationWhereUniqueInputSchema: z.ZodType<Prisma.ShowWithDurationWhereUniqueInput> =
  z
    .object({
      id: z.number(),
    })
    .and(
      z
        .object({
          id: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => ShowWithDurationWhereInputSchema),
              z.lazy(() => ShowWithDurationWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ShowWithDurationWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ShowWithDurationWhereInputSchema),
              z.lazy(() => ShowWithDurationWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          start: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          end: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          version: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
        })
        .strict(),
    );

export default ShowWithDurationWhereUniqueInputSchema;
