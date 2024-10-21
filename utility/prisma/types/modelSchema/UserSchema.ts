import { z } from 'zod';
import { PermissionSchema } from '../inputTypeSchemas/PermissionSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  permissions: PermissionSchema.array(),
  id: z.number().int(),
  name: z.string(),
  email: z.string().nullable(),
  isActive: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
