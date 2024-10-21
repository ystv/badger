import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { MetadataFieldCreateNestedOneWithoutValuesInputSchema } from './MetadataFieldCreateNestedOneWithoutValuesInputSchema';
import { ShowCreateNestedOneWithoutMetadataInputSchema } from './ShowCreateNestedOneWithoutMetadataInputSchema';
import { MediaCreateNestedOneWithoutMetadataInputSchema } from './MediaCreateNestedOneWithoutMetadataInputSchema';

export const MetadataCreateWithoutRundownInputSchema: z.ZodType<Prisma.MetadataCreateWithoutRundownInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
  show: z.lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema).optional()
}).strict();

export default MetadataCreateWithoutRundownInputSchema;
