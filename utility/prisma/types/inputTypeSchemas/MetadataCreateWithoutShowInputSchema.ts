import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { MetadataFieldCreateNestedOneWithoutValuesInputSchema } from './MetadataFieldCreateNestedOneWithoutValuesInputSchema';
import { RundownCreateNestedOneWithoutMetadataInputSchema } from './RundownCreateNestedOneWithoutMetadataInputSchema';
import { MediaCreateNestedOneWithoutMetadataInputSchema } from './MediaCreateNestedOneWithoutMetadataInputSchema';

export const MetadataCreateWithoutShowInputSchema: z.ZodType<Prisma.MetadataCreateWithoutShowInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  field: z.lazy(() => MetadataFieldCreateNestedOneWithoutValuesInputSchema),
  rundown: z.lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema).optional()
}).strict();

export default MetadataCreateWithoutShowInputSchema;
