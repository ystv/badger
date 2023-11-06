import type { Prisma } from "../../client";
import { z } from "zod";
import { UserCreatepermissionsInputSchema } from "./UserCreatepermissionsInputSchema";
import { PermissionSchema } from "./PermissionSchema";

export const UserCreateWithoutIdentitiesInputSchema: z.ZodType<Prisma.UserCreateWithoutIdentitiesInput> =
  z
    .object({
      name: z.string(),
      email: z.string().optional().nullable(),
      isActive: z.boolean().optional(),
      permissions: z
        .union([
          z.lazy(() => UserCreatepermissionsInputSchema),
          z.lazy(() => PermissionSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default UserCreateWithoutIdentitiesInputSchema;
