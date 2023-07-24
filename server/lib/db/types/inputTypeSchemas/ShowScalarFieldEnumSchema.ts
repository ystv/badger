import { z } from 'zod';

export const ShowScalarFieldEnumSchema = z.enum(['id','name','start']);

export default ShowScalarFieldEnumSchema;
