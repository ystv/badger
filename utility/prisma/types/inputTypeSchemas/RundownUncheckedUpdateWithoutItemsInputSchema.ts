import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { AssetUncheckedUpdateManyWithoutRundownNestedInputSchema } from './AssetUncheckedUpdateManyWithoutRundownNestedInputSchema';
import { MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema } from './MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema';

export const RundownUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateWithoutItemsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  showId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assets: z.lazy(() => AssetUncheckedUpdateManyWithoutRundownNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedUpdateManyWithoutRundownNestedInputSchema).optional()
}).strict();

export default RundownUncheckedUpdateWithoutItemsInputSchema;
