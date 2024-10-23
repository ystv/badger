import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';

export const EnumMediaStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MediaStateSchema).optional()
}).strict();

export default EnumMediaStateFieldUpdateOperationsInputSchema;
