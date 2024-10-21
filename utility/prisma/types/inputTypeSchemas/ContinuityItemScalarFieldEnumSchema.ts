import { z } from 'zod';

export const ContinuityItemScalarFieldEnumSchema = z.enum(['id','name','order','showId','durationSeconds','ytBroadcastID','mediaId']);

export default ContinuityItemScalarFieldEnumSchema;
