import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';

export const EnumMetadataTargetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMetadataTargetTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MetadataTargetTypeSchema).optional()
}).strict();

export default EnumMetadataTargetTypeFieldUpdateOperationsInputSchema;
