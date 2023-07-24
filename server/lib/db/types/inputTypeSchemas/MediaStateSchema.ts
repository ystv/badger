import { z } from 'zod';

export const MediaStateSchema = z.enum(['Pending','Processing','Ready','ProcessingFailed']);

export type MediaStateType = `${z.infer<typeof MediaStateSchema>}`

export default MediaStateSchema;
