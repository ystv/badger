import { z } from 'zod';

export const SettingKeySchema = z.enum(['TitleMetadataID','DescriptionMetadataID','DefaultResolution','DefaultFrameRate','DefaultIngestionType','DefaultDescription']);

export type SettingKeyType = `${z.infer<typeof SettingKeySchema>}`

export default SettingKeySchema;
