import { z } from 'zod';

export const RundownScalarFieldEnumSchema = z.enum(['id','name','showId','order','ytBroadcastID']);

export default RundownScalarFieldEnumSchema;
