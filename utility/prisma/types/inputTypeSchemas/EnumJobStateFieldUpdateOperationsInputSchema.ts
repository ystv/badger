import type { Prisma } from '../../client';

import { z } from 'zod';
import { JobStateSchema } from './JobStateSchema';

export const EnumJobStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JobStateSchema).optional()
}).strict();

export default EnumJobStateFieldUpdateOperationsInputSchema;
