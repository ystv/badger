import { z } from 'zod';

export const BaseJobScalarFieldEnumSchema = z.enum(['id','workerId','state','startedAt','completedAt']);

export default BaseJobScalarFieldEnumSchema;
