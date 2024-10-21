import { z } from 'zod';
import type { Prisma } from '../../client';

export const SettingSelectSchema: z.ZodType<Prisma.SettingSelect> = z.object({
  id: z.boolean().optional(),
  key: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict()

export default SettingSelectSchema;
