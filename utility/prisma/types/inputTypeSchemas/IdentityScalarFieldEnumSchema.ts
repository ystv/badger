import { z } from 'zod';

export const IdentityScalarFieldEnumSchema = z.enum(['id','provider','identityID','userID']);

export default IdentityScalarFieldEnumSchema;
