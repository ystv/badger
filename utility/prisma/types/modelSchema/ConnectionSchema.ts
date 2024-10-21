import { z } from 'zod';
import { ConnectionTargetSchema } from '../inputTypeSchemas/ConnectionTargetSchema'

/////////////////////////////////////////
// CONNECTION SCHEMA
/////////////////////////////////////////

export const ConnectionSchema = z.object({
  target: ConnectionTargetSchema,
  id: z.number().int(),
  userId: z.number().int(),
  refreshToken: z.string(),
})

export type Connection = z.infer<typeof ConnectionSchema>

export default ConnectionSchema;
