import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { EnumMetadataValueTypeFieldUpdateOperationsInputSchema } from './EnumMetadataValueTypeFieldUpdateOperationsInputSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { EnumMetadataTargetTypeFieldUpdateOperationsInputSchema } from './EnumMetadataTargetTypeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { MetadataUpdateManyWithoutFieldNestedInputSchema } from './MetadataUpdateManyWithoutFieldNestedInputSchema';

export const MetadataFieldUpdateInputSchema: z.ZodType<Prisma.MetadataFieldUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MetadataValueTypeSchema),z.lazy(() => EnumMetadataValueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.lazy(() => MetadataTargetTypeSchema),z.lazy(() => EnumMetadataTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  default: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  values: z.lazy(() => MetadataUpdateManyWithoutFieldNestedInputSchema).optional()
}).strict();

export default MetadataFieldUpdateInputSchema;
