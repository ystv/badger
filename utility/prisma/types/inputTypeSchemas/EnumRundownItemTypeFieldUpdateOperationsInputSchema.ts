import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';

export const EnumRundownItemTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRundownItemTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RundownItemTypeSchema).optional()
}).strict();

export default EnumRundownItemTypeFieldUpdateOperationsInputSchema;
