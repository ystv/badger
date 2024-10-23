import { z } from 'zod';

export const ShowWithDurationScalarFieldEnumSchema = z.enum(['id','name','start','durationSeconds','end','version','ytStreamID','ytBroadcastID']);

export default ShowWithDurationScalarFieldEnumSchema;
