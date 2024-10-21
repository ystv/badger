import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { RundownItemCreateNestedManyWithoutMediaInputSchema } from './RundownItemCreateNestedManyWithoutMediaInputSchema';
import { ContinuityItemCreateNestedManyWithoutMediaInputSchema } from './ContinuityItemCreateNestedManyWithoutMediaInputSchema';
import { AssetCreateNestedManyWithoutMediaInputSchema } from './AssetCreateNestedManyWithoutMediaInputSchema';
import { MetadataCreateNestedManyWithoutMediaInputSchema } from './MetadataCreateNestedManyWithoutMediaInputSchema';

export const MediaCreateWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateWithoutTasksInput> = z.object({
  name: z.string(),
  rawPath: z.string(),
  path: z.string().optional().nullable(),
  durationSeconds: z.number().int(),
  state: z.lazy(() => MediaStateSchema).optional(),
  rundownItems: z.lazy(() => RundownItemCreateNestedManyWithoutMediaInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemCreateNestedManyWithoutMediaInputSchema).optional(),
  assets: z.lazy(() => AssetCreateNestedManyWithoutMediaInputSchema).optional(),
  metadata: z.lazy(() => MetadataCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export default MediaCreateWithoutTasksInputSchema;
