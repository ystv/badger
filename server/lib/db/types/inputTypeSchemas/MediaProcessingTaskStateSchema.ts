import { z } from 'zod';

export const MediaProcessingTaskStateSchema = z.enum(['Pending','Running','Complete','Failed','Warning']);

export type MediaProcessingTaskStateType = `${z.infer<typeof MediaProcessingTaskStateSchema>}`

export default MediaProcessingTaskStateSchema;
