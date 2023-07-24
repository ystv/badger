import { z } from 'zod';

export const RundownScalarFieldEnumSchema = z.enum(['id','name','showId','order']);

export default RundownScalarFieldEnumSchema;
