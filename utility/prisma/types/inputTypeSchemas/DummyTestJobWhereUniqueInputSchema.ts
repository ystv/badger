import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { BaseJobRelationFilterSchema } from "./BaseJobRelationFilterSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const DummyTestJobWhereUniqueInputSchema: z.ZodType<Prisma.DummyTestJobWhereUniqueInput> =
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
              z.lazy(() => DummyTestJobWhereInputSchema),
              z.lazy(() => DummyTestJobWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => DummyTestJobWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => DummyTestJobWhereInputSchema),
              z.lazy(() => DummyTestJobWhereInputSchema).array(),
            ])
            .optional(),
          baseJobId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          base_job: z
            .union([
              z.lazy(() => BaseJobRelationFilterSchema),
              z.lazy(() => BaseJobWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export default DummyTestJobWhereUniqueInputSchema;
