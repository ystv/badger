import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RundownUncheckedUpdateManyWithoutShowNestedInputSchema } from './RundownUncheckedUpdateManyWithoutShowNestedInputSchema';
import { ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema } from './ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema';

export const ShowUncheckedUpdateWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUncheckedUpdateWithoutMetadataInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ytStreamID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ytBroadcastID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rundowns: z.lazy(() => RundownUncheckedUpdateManyWithoutShowNestedInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutShowNestedInputSchema).optional()
}).strict();

export default ShowUncheckedUpdateWithoutMetadataInputSchema;
