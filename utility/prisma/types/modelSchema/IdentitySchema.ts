import { z } from 'zod';

/////////////////////////////////////////
// IDENTITY SCHEMA
/////////////////////////////////////////

export const IdentitySchema = z.object({
  id: z.number().int(),
  provider: z.string(),
  identityID: z.string(),
  userID: z.number().int(),
})

export type Identity = z.infer<typeof IdentitySchema>

export default IdentitySchema;
