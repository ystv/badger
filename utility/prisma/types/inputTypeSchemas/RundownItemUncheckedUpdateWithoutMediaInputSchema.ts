import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { EnumRundownItemTypeFieldUpdateOperationsInputSchema } from './EnumRundownItemTypeFieldUpdateOperationsInputSchema';

export const RundownItemUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rundownId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default RundownItemUncheckedUpdateWithoutMediaInputSchema;
