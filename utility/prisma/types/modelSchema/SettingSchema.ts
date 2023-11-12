import { z } from "zod";
import { InputJsonValue } from "../inputTypeSchemas/InputJsonValue";
import { SettingsCategorySchema } from "../inputTypeSchemas/SettingsCategorySchema";
import { SettingKeySchema } from "../inputTypeSchemas/SettingKeySchema";

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  category: SettingsCategorySchema,
  key: SettingKeySchema,
  id: z.number().int(),
  value: InputJsonValue,
});

export type Setting = z.infer<typeof SettingSchema>;

export default SettingSchema;
