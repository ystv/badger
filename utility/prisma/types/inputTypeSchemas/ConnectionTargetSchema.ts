import { z } from 'zod';

export const ConnectionTargetSchema = z.enum(['google']);

export type ConnectionTargetType = `${z.infer<typeof ConnectionTargetSchema>}`

export default ConnectionTargetSchema;
