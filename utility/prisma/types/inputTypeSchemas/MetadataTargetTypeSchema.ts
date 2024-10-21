import { z } from 'zod';

export const MetadataTargetTypeSchema = z.enum(['Show','Rundown','ShowOrRundown']);

export type MetadataTargetTypeType = `${z.infer<typeof MetadataTargetTypeSchema>}`

export default MetadataTargetTypeSchema;
