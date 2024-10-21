import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ShowUpdateOneRequiredWithoutRundownsNestedInputSchema } from './ShowUpdateOneRequiredWithoutRundownsNestedInputSchema';
import { AssetUpdateManyWithoutRundownNestedInputSchema } from './AssetUpdateManyWithoutRundownNestedInputSchema';
import { MetadataUpdateManyWithoutRundownNestedInputSchema } from './MetadataUpdateManyWithoutRundownNestedInputSchema';

export const RundownUpdateWithoutItemsInputSchema: z.ZodType<Prisma.RundownUpdateWithoutItemsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema).optional(),
  assets: z.lazy(() => AssetUpdateManyWithoutRundownNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema).optional()
}).strict();

export default RundownUpdateWithoutItemsInputSchema;
