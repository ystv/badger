import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';
import { EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema } from './EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema';
import { MediaUpdateOneRequiredWithoutTasksNestedInputSchema } from './MediaUpdateOneRequiredWithoutTasksNestedInputSchema';

export const MediaProcessingTaskUpdateInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  additionalInfo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => MediaProcessingTaskStateSchema),z.lazy(() => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateOneRequiredWithoutTasksNestedInputSchema).optional()
}).strict();

export default MediaProcessingTaskUpdateInputSchema;
