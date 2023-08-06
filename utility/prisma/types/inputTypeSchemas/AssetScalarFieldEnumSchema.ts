import { z } from 'zod';

export const AssetScalarFieldEnumSchema = z.enum(['id','name','type','rundownId','mediaId']);

export default AssetScalarFieldEnumSchema;
