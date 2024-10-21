import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema } from './MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema';
import { RundownUpdateOneWithoutMetadataNestedInputSchema } from './RundownUpdateOneWithoutMetadataNestedInputSchema';
import { MediaUpdateOneWithoutMetadataNestedInputSchema } from './MediaUpdateOneWithoutMetadataNestedInputSchema';

export const MetadataUpdateWithoutShowInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutShowInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  field: z.lazy(() => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema).optional(),
  rundown: z.lazy(() => RundownUpdateOneWithoutMetadataNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema).optional()
}).strict();

export default MetadataUpdateWithoutShowInputSchema;
