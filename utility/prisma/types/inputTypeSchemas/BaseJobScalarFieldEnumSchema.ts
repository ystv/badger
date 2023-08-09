import { z } from 'zod';

export const BaseJobScalarFieldEnumSchema = z.enum(['id','workerId','state','createdAt','startedAt','completedAt']);

export default BaseJobScalarFieldEnumSchema;
