import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { ShowCreateNestedOneWithoutMetadataInputSchema } from './ShowCreateNestedOneWithoutMetadataInputSchema';
import { RundownCreateNestedOneWithoutMetadataInputSchema } from './RundownCreateNestedOneWithoutMetadataInputSchema';
import { MediaCreateNestedOneWithoutMetadataInputSchema } from './MediaCreateNestedOneWithoutMetadataInputSchema';

export const MetadataCreateWithoutFieldInputSchema: z.ZodType<Prisma.MetadataCreateWithoutFieldInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  show: z.lazy(() => ShowCreateNestedOneWithoutMetadataInputSchema).optional(),
  rundown: z.lazy(() => RundownCreateNestedOneWithoutMetadataInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedOneWithoutMetadataInputSchema).optional()
}).strict();

export default MetadataCreateWithoutFieldInputSchema;
