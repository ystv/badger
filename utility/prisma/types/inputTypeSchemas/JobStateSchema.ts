import { z } from 'zod';

export const JobStateSchema = z.enum(['Pending','Running','Complete','Failed']);

export type JobStateType = `${z.infer<typeof JobStateSchema>}`

export default JobStateSchema;
