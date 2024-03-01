import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { EnumJobStateFilterSchema } from "./EnumJobStateFilterSchema";
import { JobStateSchema } from "./JobStateSchema";
import { DateTimeFilterSchema } from "./DateTimeFilterSchema";
import { DateTimeNullableFilterSchema } from "./DateTimeNullableFilterSchema";
import { ProcessMediaJobNullableRelationFilterSchema } from "./ProcessMediaJobNullableRelationFilterSchema";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";
import { LoadAssetJobNullableRelationFilterSchema } from "./LoadAssetJobNullableRelationFilterSchema";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";
import { DummyTestJobNullableRelationFilterSchema } from "./DummyTestJobNullableRelationFilterSchema";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";

export const BaseJobWhereInputSchema: z.ZodType<Prisma.BaseJobWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => BaseJobWhereInputSchema),
        z.lazy(() => BaseJobWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => BaseJobWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => BaseJobWhereInputSchema),
        z.lazy(() => BaseJobWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    workerId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    state: z
      .union([
        z.lazy(() => EnumJobStateFilterSchema),
        z.lazy(() => JobStateSchema),
      ])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    startedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    completedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    externalJobProvider: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    externalJobID: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    ProcessMediaJob: z
      .union([
        z.lazy(() => ProcessMediaJobNullableRelationFilterSchema),
        z.lazy(() => ProcessMediaJobWhereInputSchema),
      ])
      .optional()
      .nullable(),
    LoadAssetJob: z
      .union([
        z.lazy(() => LoadAssetJobNullableRelationFilterSchema),
        z.lazy(() => LoadAssetJobWhereInputSchema),
      ])
      .optional()
      .nullable(),
    DummyTestJob: z
      .union([
        z.lazy(() => DummyTestJobNullableRelationFilterSchema),
        z.lazy(() => DummyTestJobWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export default BaseJobWhereInputSchema;
