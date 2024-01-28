import { z } from "zod";

export const SettingScalarFieldEnumSchema = z.enum([
  "id",
  "category",
  "key",
  "value",
]);

export default SettingScalarFieldEnumSchema;
