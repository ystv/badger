import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobStateSchema } from './JobStateSchema';
import { JobTypeSchema } from './JobTypeSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const BaseJobCreateManyInputSchema: z.ZodType<Prisma.BaseJobCreateManyInput> = z.object({
  id: z.number().int().optional(),
  workerId: z.string().optional().nullable(),
  state: z.lazy(() => JobStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  startedAt: z.coerce.date().optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  manuallyTriggered: z.boolean().optional(),
  externalJobProvider: z.string().optional().nullable(),
  externalJobID: z.string().optional().nullable(),
  jobType: z.lazy(() => JobTypeSchema),
  jobPayload: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export default BaseJobCreateManyInputSchema;
