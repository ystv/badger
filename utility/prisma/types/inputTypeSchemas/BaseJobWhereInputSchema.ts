import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumJobStateFilterSchema } from './EnumJobStateFilterSchema';
import { JobStateSchema } from './JobStateSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { EnumJobTypeFilterSchema } from './EnumJobTypeFilterSchema';
import { JobTypeSchema } from './JobTypeSchema';
import { JsonFilterSchema } from './JsonFilterSchema';

export const BaseJobWhereInputSchema: z.ZodType<Prisma.BaseJobWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BaseJobWhereInputSchema),z.lazy(() => BaseJobWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BaseJobWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BaseJobWhereInputSchema),z.lazy(() => BaseJobWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  workerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => EnumJobStateFilterSchema),z.lazy(() => JobStateSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  manuallyTriggered: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  externalJobProvider: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  externalJobID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jobType: z.union([ z.lazy(() => EnumJobTypeFilterSchema),z.lazy(() => JobTypeSchema) ]).optional(),
  jobPayload: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export default BaseJobWhereInputSchema;
