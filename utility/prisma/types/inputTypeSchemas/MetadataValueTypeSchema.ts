import { z } from 'zod';

export const MetadataValueTypeSchema = z.enum(['Text','LongText','URL','Media']);

export type MetadataValueTypeType = `${z.infer<typeof MetadataValueTypeSchema>}`

export default MetadataValueTypeSchema;
