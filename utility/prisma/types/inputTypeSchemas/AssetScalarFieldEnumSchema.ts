import { z } from 'zod';

export const AssetScalarFieldEnumSchema = z.enum(['id','name','category','order','rundownId','mediaId']);

export default AssetScalarFieldEnumSchema;
