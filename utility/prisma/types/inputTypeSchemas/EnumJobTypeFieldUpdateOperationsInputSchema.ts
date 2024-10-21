import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobTypeSchema } from './JobTypeSchema';

export const EnumJobTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JobTypeSchema).optional()
}).strict();

export default EnumJobTypeFieldUpdateOperationsInputSchema;
