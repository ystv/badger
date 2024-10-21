import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { RundownItemCreateNestedManyWithoutMediaInputSchema } from './RundownItemCreateNestedManyWithoutMediaInputSchema';
import { ContinuityItemCreateNestedManyWithoutMediaInputSchema } from './ContinuityItemCreateNestedManyWithoutMediaInputSchema';
import { MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema } from './MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema';
import { AssetCreateNestedManyWithoutMediaInputSchema } from './AssetCreateNestedManyWithoutMediaInputSchema';

export const MediaCreateWithoutMetadataInputSchema: z.ZodType<Prisma.MediaCreateWithoutMetadataInput> = z.object({
  name: z.string(),
  rawPath: z.string(),
  path: z.string().optional().nullable(),
  durationSeconds: z.number().int(),
  state: z.lazy(() => MediaStateSchema).optional(),
  rundownItems: z.lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema).optional(),
  assets: z.lazy(() => AssetCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export default MediaCreateWithoutMetadataInputSchema;
