import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';

export const EnumMetadataValueTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMetadataValueTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MetadataValueTypeSchema).optional()
}).strict();

export default EnumMetadataValueTypeFieldUpdateOperationsInputSchema;
