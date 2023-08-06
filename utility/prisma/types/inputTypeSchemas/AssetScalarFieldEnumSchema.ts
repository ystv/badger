import { z } from 'zod';

export const AssetScalarFieldEnumSchema = z.enum(['id','name','path','type','state','rundownId']);

export default AssetScalarFieldEnumSchema;
