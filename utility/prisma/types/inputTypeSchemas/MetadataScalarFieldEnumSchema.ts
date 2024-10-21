import { z } from 'zod';

export const MetadataScalarFieldEnumSchema = z.enum(['id','value','fieldId','showId','rundownId','mediaId']);

export default MetadataScalarFieldEnumSchema;
