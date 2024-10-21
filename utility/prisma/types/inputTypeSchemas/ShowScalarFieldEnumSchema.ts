import { z } from 'zod';

export const ShowScalarFieldEnumSchema = z.enum(['id','name','start','version','ytStreamID','ytBroadcastID']);

export default ShowScalarFieldEnumSchema;
