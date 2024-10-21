import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RundownUpdateManyWithoutShowNestedInputSchema } from './RundownUpdateManyWithoutShowNestedInputSchema';
import { MetadataUpdateManyWithoutShowNestedInputSchema } from './MetadataUpdateManyWithoutShowNestedInputSchema';

export const ShowUpdateWithoutContinuityItemsInputSchema: z.ZodType<Prisma.ShowUpdateWithoutContinuityItemsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytStreamID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rundowns: z.lazy(() => RundownUpdateManyWithoutShowNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export default ShowUpdateWithoutContinuityItemsInputSchema;
