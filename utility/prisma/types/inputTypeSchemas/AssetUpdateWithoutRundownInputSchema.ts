import type { Prisma } from '../../client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { MediaUpdateOneRequiredWithoutAssetsNestedInputSchema } from './MediaUpdateOneRequiredWithoutAssetsNestedInputSchema';

export const AssetUpdateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateWithoutRundownInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateOneRequiredWithoutAssetsNestedInputSchema).optional()
}).strict();

export default AssetUpdateWithoutRundownInputSchema;
