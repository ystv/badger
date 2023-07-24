import { z } from 'zod';

export const MediaScalarFieldEnumSchema = z.enum(['id','name','rawPath','path','durationSeconds','state','rundownItemID','continuityItemID']);

export default MediaScalarFieldEnumSchema;
