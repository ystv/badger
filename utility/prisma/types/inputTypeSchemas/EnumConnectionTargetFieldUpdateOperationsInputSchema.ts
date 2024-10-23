import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const EnumConnectionTargetFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConnectionTargetFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ConnectionTargetSchema).optional()
}).strict();

export default EnumConnectionTargetFieldUpdateOperationsInputSchema;
