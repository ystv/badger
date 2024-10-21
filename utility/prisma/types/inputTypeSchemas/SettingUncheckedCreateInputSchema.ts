import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const SettingUncheckedCreateInputSchema: z.ZodType<Prisma.SettingUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  key: z.lazy(() => SettingKeySchema),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export default SettingUncheckedCreateInputSchema;
