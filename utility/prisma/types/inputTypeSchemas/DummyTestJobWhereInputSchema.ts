import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { BaseJobRelationFilterSchema } from "./BaseJobRelationFilterSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const DummyTestJobWhereInputSchema: z.ZodType<Prisma.DummyTestJobWhereInput> =
  z
    .object({
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
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
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
    .strict();

export default DummyTestJobWhereInputSchema;
