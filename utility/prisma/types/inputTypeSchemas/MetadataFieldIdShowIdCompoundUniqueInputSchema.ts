import type { Prisma } from '../../client';

import { z } from 'zod';

export const MetadataFieldIdShowIdCompoundUniqueInputSchema: z.ZodType<Prisma.MetadataFieldIdShowIdCompoundUniqueInput> = z.object({
  fieldId: z.number(),
  showId: z.number()
}).strict();

export default MetadataFieldIdShowIdCompoundUniqueInputSchema;
