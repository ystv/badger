import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema } from './RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema';
import { MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema } from './MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema';

export const RundownUncheckedUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutAssetsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  items: z.lazy(() => RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema).optional()
}).strict();

export default RundownUncheckedUpdateWithoutAssetsInputSchema;
