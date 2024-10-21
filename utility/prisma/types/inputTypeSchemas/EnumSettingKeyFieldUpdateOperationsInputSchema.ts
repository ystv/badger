import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';

export const EnumSettingKeyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSettingKeyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SettingKeySchema).optional()
}).strict();

export default EnumSettingKeyFieldUpdateOperationsInputSchema;
