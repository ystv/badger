import { z } from 'zod';

export const ConnectionScalarFieldEnumSchema = z.enum(['id','userId','target','refreshToken']);

export default ConnectionScalarFieldEnumSchema;
