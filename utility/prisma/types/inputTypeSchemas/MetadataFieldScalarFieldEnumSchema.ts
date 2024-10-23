import { z } from 'zod';

export const MetadataFieldScalarFieldEnumSchema = z.enum(['id','name','type','target','archived','default']);

export default MetadataFieldScalarFieldEnumSchema;
