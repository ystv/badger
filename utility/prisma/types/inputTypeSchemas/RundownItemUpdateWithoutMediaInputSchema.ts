import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { EnumRundownItemTypeFieldUpdateOperationsInputSchema } from './EnumRundownItemTypeFieldUpdateOperationsInputSchema';
import { RundownUpdateOneRequiredWithoutItemsNestedInputSchema } from './RundownUpdateOneRequiredWithoutItemsNestedInputSchema';

export const RundownItemUpdateWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpdateWithoutMediaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rundown: z.lazy(() => RundownUpdateOneRequiredWithoutItemsNestedInputSchema).optional()
}).strict();

export default RundownItemUpdateWithoutMediaInputSchema;
