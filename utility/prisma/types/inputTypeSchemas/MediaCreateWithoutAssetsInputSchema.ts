import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { RundownItemCreateNestedManyWithoutMediaInputSchema } from './RundownItemCreateNestedManyWithoutMediaInputSchema';
import { ContinuityItemCreateNestedManyWithoutMediaInputSchema } from './ContinuityItemCreateNestedManyWithoutMediaInputSchema';
import { MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema } from './MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema';
import { MetadataCreateNestedManyWithoutMediaInputSchema } from './MetadataCreateNestedManyWithoutMediaInputSchema';

export const MediaCreateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaCreateWithoutAssetsInput> = z.object({
  name: z.string(),
  rawPath: z.string(),
  path: z.string().optional().nullable(),
  durationSeconds: z.number().int(),
  state: z.lazy(() => MediaStateSchema).optional(),
  rundownItems: z.lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export default MediaCreateWithoutAssetsInputSchema;
