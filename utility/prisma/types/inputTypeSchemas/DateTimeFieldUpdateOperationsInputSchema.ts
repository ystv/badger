import type { Prisma } from '../../client';

import { z } from 'zod';

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export default DateTimeFieldUpdateOperationsInputSchema;
