import { z } from 'zod';

export const BaseJobScalarFieldEnumSchema = z.enum(['id','workerId','state','createdAt','startedAt','completedAt','manuallyTriggered','externalJobProvider','externalJobID','jobType','jobPayload']);

export default BaseJobScalarFieldEnumSchema;
