import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';
import { EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema } from './EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema';

export const MediaProcessingTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyMutationInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  additionalInfo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => MediaProcessingTaskStateSchema),z.lazy(() => EnumMediaProcessingTaskStateFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default MediaProcessingTaskUpdateManyMutationInputSchema;
