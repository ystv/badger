import { z } from 'zod';

export const ContinuityItemScalarFieldEnumSchema = z.enum(['id','name','order','showId','durationSeconds']);

export default ContinuityItemScalarFieldEnumSchema;
