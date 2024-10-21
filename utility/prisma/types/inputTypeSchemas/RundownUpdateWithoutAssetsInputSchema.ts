import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ShowUpdateOneRequiredWithoutRundownsNestedInputSchema } from './ShowUpdateOneRequiredWithoutRundownsNestedInputSchema';
import { RundownItemUpdateManyWithoutRundownNestedInputSchema } from './RundownItemUpdateManyWithoutRundownNestedInputSchema';
import { MetadataUpdateManyWithoutRundownNestedInputSchema } from './MetadataUpdateManyWithoutRundownNestedInputSchema';

export const RundownUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.RundownUpdateWithoutAssetsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  show: z.lazy(() => ShowUpdateOneRequiredWithoutRundownsNestedInputSchema).optional(),
  items: z.lazy(() => RundownItemUpdateManyWithoutRundownNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUpdateManyWithoutRundownNestedInputSchema).optional()
}).strict();

export default RundownUpdateWithoutAssetsInputSchema;
