import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { ContinuityItemCreateNestedManyWithoutMediaInputSchema } from './ContinuityItemCreateNestedManyWithoutMediaInputSchema';
import { MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema } from './MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema';
import { AssetCreateNestedManyWithoutMediaInputSchema } from './AssetCreateNestedManyWithoutMediaInputSchema';
import { MetadataCreateNestedManyWithoutMediaInputSchema } from './MetadataCreateNestedManyWithoutMediaInputSchema';

export const MediaCreateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateWithoutRundownItemsInput> = z.object({
  name: z.string(),
  rawPath: z.string(),
  path: z.string().optional().nullable(),
  durationSeconds: z.number().int(),
  state: z.lazy(() => MediaStateSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema).optional(),
  assets: z.lazy(() => AssetCreateNestedManyWithoutMediaInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export default MediaCreateWithoutRundownItemsInputSchema;
