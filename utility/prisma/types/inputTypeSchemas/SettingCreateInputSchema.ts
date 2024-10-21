import type { Prisma } from '../../client';

import { z } from 'zod';
import { SettingKeySchema } from './SettingKeySchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z.object({
  key: z.lazy(() => SettingKeySchema),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export default SettingCreateInputSchema;
