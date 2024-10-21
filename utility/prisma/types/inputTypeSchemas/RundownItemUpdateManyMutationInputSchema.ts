import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { EnumRundownItemTypeFieldUpdateOperationsInputSchema } from './EnumRundownItemTypeFieldUpdateOperationsInputSchema';

export const RundownItemUpdateManyMutationInputSchema: z.ZodType<Prisma.RundownItemUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => RundownItemTypeSchema),z.lazy(() => EnumRundownItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default RundownItemUpdateManyMutationInputSchema;
