import { z } from 'zod';

export const ShowScalarFieldEnumSchema = z.enum(['id','name','start','version']);

export default ShowScalarFieldEnumSchema;
