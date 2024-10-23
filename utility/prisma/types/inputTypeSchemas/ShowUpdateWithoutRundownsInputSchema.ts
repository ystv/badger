import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ContinuityItemUpdateManyWithoutShowNestedInputSchema } from './ContinuityItemUpdateManyWithoutShowNestedInputSchema';
import { MetadataUpdateManyWithoutShowNestedInputSchema } from './MetadataUpdateManyWithoutShowNestedInputSchema';

export const ShowUpdateWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpdateWithoutRundownsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytStreamID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  continuityItems: z.lazy(() => ContinuityItemUpdateManyWithoutShowNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export default ShowUpdateWithoutRundownsInputSchema;
