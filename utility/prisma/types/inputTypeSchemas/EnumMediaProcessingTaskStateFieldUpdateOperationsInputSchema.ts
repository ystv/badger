import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaProcessingTaskStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MediaProcessingTaskStateSchema).optional()
}).strict();

export default EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema;
