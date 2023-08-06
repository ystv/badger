import { z } from 'zod';

export const LoadAssetJobScalarFieldEnumSchema = z.enum(['id','sourceType','source','asset_id','base_job_id']);

export default LoadAssetJobScalarFieldEnumSchema;
