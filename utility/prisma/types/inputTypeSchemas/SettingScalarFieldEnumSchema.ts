import { z } from 'zod';

export const SettingScalarFieldEnumSchema = z.enum(['id','key','value']);

export default SettingScalarFieldEnumSchema;
