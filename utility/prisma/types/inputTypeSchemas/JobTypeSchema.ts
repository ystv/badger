import { z } from 'zod';

export const JobTypeSchema = z.enum(['LoadAssetJob','ProcessMediaJob','DummyTestJob']);

export type JobTypeType = `${z.infer<typeof JobTypeSchema>}`

export default JobTypeSchema;
