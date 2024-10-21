import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema } from './MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema';
import { ShowUpdateOneWithoutMetadataNestedInputSchema } from './ShowUpdateOneWithoutMetadataNestedInputSchema';
import { MediaUpdateOneWithoutMetadataNestedInputSchema } from './MediaUpdateOneWithoutMetadataNestedInputSchema';

export const MetadataUpdateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataUpdateWithoutRundownInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  field: z.lazy(() => MetadataFieldUpdateOneRequiredWithoutValuesNestedInputSchema).optional(),
  show: z.lazy(() => ShowUpdateOneWithoutMetadataNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateOneWithoutMetadataNestedInputSchema).optional()
}).strict();

export default MetadataUpdateWithoutRundownInputSchema;
