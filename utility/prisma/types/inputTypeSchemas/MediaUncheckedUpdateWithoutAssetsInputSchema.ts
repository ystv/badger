import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { MediaStateSchema } from './MediaStateSchema';
import { EnumMediaStateFieldUpdateOperationsInputSchema } from './EnumMediaStateFieldUpdateOperationsInputSchema';
import { RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema } from './RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema';
import { ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema } from './ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema';
import { MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema } from './MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema';
import { MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema } from './MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema';

export const MediaUncheckedUpdateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutAssetsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rawPath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  durationSeconds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => MediaStateSchema),z.lazy(() => EnumMediaStateFieldUpdateOperationsInputSchema) ]).optional(),
  rundownItems: z.lazy(() => RundownItemUncheckedUpdateManyWithoutMediaNestedInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskUncheckedUpdateManyWithoutMediaNestedInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export default MediaUncheckedUpdateWithoutAssetsInputSchema;
