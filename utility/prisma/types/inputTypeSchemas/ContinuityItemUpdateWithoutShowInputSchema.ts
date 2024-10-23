import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { MediaUpdateOneWithoutContinuityItemsNestedInputSchema } from './MediaUpdateOneWithoutContinuityItemsNestedInputSchema';

export const ContinuityItemUpdateWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUpdateWithoutShowInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  media: z.lazy(() => MediaUpdateOneWithoutContinuityItemsNestedInputSchema).optional()
}).strict();

export default ContinuityItemUpdateWithoutShowInputSchema;
