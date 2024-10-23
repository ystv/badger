import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema } from './MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema';
import { ShowUpdateOneWithoutMetadataNestedInputSchema } from './ShowUpdateOneWithoutMetadataNestedInputSchema';
import { RundownUpdateOneWithoutMetadataNestedInputSchema } from './RundownUpdateOneWithoutMetadataNestedInputSchema';

export const MetadataUpdateWithoutMediaInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutMediaInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  field: z.lazy(() => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema).optional(),
  rundown: z.lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema).optional()
}).strict();

export default MetadataUpdateWithoutMediaInputSchema;
