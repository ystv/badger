import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { EnumSettingKeyFieldUpdateOperationsInputSchema } from './EnumSettingKeyFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const SettingUpdateInputSchema: z.ZodType<Prisma.SettingUpdateInput> = z.object({
  key: z.union([ z.lazy(() => SettingKeySchema),z.lazy(() => EnumSettingKeyFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export default SettingUpdateInputSchema;
