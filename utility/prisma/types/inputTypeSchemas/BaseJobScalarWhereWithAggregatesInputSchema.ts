import type { Prisma } from "../../client";
import { z } from "zod";
import { IntWithAggregatesFilterSchema } from "./IntWithAggregatesFilterSchema";
import { StringNullableWithAggregatesFilterSchema } from "./StringNullableWithAggregatesFilterSchema";
import { EnumJobStateWithAggregatesFilterSchema } from "./EnumJobStateWithAggregatesFilterSchema";
import { JobStateSchema } from "./JobStateSchema";
import { DateTimeWithAggregatesFilterSchema } from "./DateTimeWithAggregatesFilterSchema";
import { DateTimeNullableWithAggregatesFilterSchema } from "./DateTimeNullableWithAggregatesFilterSchema";
import { EnumJobTypeWithAggregatesFilterSchema } from "./EnumJobTypeWithAggregatesFilterSchema";
import { JobTypeSchema } from "./JobTypeSchema";
import { JsonWithAggregatesFilterSchema } from "./JsonWithAggregatesFilterSchema";

export const BaseJobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BaseJobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BaseJobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseJobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      workerId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      state: z
        .union([
          z.lazy(() => EnumJobStateWithAggregatesFilterSchema),
          z.lazy(() => JobStateSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      startedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      completedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      externalJobProvider: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      externalJobID: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      jobType: z
        .union([
          z.lazy(() => EnumJobTypeWithAggregatesFilterSchema),
          z.lazy(() => JobTypeSchema),
        ])
        .optional(),
      jobPayload: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
    })
    .strict();

export default BaseJobScalarWhereWithAggregatesInputSchema;
