import { z } from 'zod';

export const MediaFileSourceTypeSchema = z.enum(['Tus','GoogleDrive']);

export type MediaFileSourceTypeType = `${z.infer<typeof MediaFileSourceTypeSchema>}`

export default MediaFileSourceTypeSchema;
