import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaStateSchema } from './MediaStateSchema';
import { RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema } from './RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema';
import { ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema } from './ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema';
import { MetadataUncheckedCreateNestedManyWithoutMediaInputSchema } from './MetadataUncheckedCreateNestedManyWithoutMediaInputSchema';

export const MediaUncheckedCreateWithoutAssetsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutAssetsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawPath: z.string(),
  path: z.string().optional().nullable(),
  durationSeconds: z.number().int(),
  state: z.lazy(() => MediaStateSchema).optional(),
  rundownItems: z.lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema).optional(),
  metadata: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export default MediaUncheckedCreateWithoutAssetsInputSchema;
