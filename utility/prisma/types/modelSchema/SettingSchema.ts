import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { SettingKeySchema } from '../inputTypeSchemas/SettingKeySchema'

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  key: SettingKeySchema,
  id: z.number().int(),
  value: JsonValueSchema,
})

export type Setting = z.infer<typeof SettingSchema>

export default SettingSchema;
