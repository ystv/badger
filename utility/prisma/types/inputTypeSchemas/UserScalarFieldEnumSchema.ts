import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','isActive','permissions']);

export default UserScalarFieldEnumSchema;
